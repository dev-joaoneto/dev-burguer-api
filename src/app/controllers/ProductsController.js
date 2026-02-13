import * as Yup from 'yup';
import Product from './../models/Product.js';
import Category from './../models/Category.js';
import cloudinary from './../../config/cloudinary.js';

class ProductsController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		if (!request.file) {
			return response.status(400).json({ error: 'Image is required' });
		}

		const { name, price, category_id, offer } = request.body;

		const result = await cloudinary.uploader.upload(request.file.path, {
			folder: 'products',
		});

		const newProduct = await Product.create({
			name,
			price,
			category_id,
			offer,
			image_url: result.secure_url,
			public_id: result.public_id,
		});

		return response.status(201).json(newProduct);
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { id } = request.params;
		const { name, price, category_id, offer } = request.body;

		const product = await Product.findByPk(id);
		if (!product) {
			return response.status(404).json({ error: 'Product not found' });
		}

		const updateData = {
			name,
			price,
			category_id,
			offer,
		};

		if (request.file) {
			// 🔥 remove imagem antiga
			if (product.public_id) {
				await cloudinary.uploader.destroy(product.public_id);
			}

			const result = await cloudinary.uploader.upload(request.file.path, {
				folder: 'products',
			});

			updateData.image_url = result.secure_url;
			updateData.public_id = result.public_id;
		}

		await Product.update(updateData, {
			where: { id },
		});

		return response.status(201).json();
	}

	async index(_request, response) {
		const products = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['id', 'name'],
				},
			],
		});
		return response.status(200).json(products);
	}
}

export default new ProductsController();
