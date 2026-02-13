import * as Yup from 'yup';
import Category from '../models/Category.js';
import cloudinary from '../../config/cloudinary.js';

class CategoryController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name } = request.body;

		if (!request.file) {
			return response.status(400).json({ error: 'Image is required' });
		}

		const existingCategory = await Category.findOne({
			where: {
				name
			}
		});

		if (existingCategory) {
			return response.status(400).json({ error: 'Category already exists' });
		}

		const result = await cloudinary.uploader.upload(request.file.path, {
			folder: 'categories',
		});

		const newCategory = await Category.create({
			name,
			image_url: result.secure_url,
			public_id: result.public_id,
		});

		return response.status(201).json(newCategory);
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name } = request.body;
		const { id } = request.params;

		const category = await Category.findByPk(id);

		if (!category) {
			return response.status(404).json({ error: 'Category not found' });
		}

		let image_url = category.image_url;
		let public_id = category.public_id;

		if (request.file) {
			// remove imagem antiga
			if (public_id) {
				await cloudinary.uploader.destroy(public_id);
			}

			// upload nova imagem
			const result = await cloudinary.uploader.upload(request.file.path, {
				folder: 'categories',
			});

			image_url = result.secure_url;
			public_id = result.public_id;
		}



		await Category.update({
			name,
			image_url,
			public_id,
		}, {
			where: {
				id
			}
		});

		return response.status(201).json();
	}

	async index(_request, response) {
		const categories = await Category.findAll();
		return response.status(200).json(categories);
	}
}

export default new CategoryController();
