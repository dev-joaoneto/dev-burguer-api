/*
store -> Cria dados
index -> Lista todos os dados
show -> Mostra um dado específico
update -> Atualiza um dado específico
delete -> Deleta um dado específico
*/


import  * as Yup from 'yup';
import { v4 } from 'uuid';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string()

				.required('Nome é obrigatório')

				.matches(
					/^[A-Za-zÀ-ÿ\s]+$/,
					'O nome deve conter apenas letras e espaços',
				),

			email: Yup.string()
				.email('E-mail inválido')
				.required('E-mail é obrigatório'),

			password: Yup.string()
				.min(6)
				.required('Senha obrigatória'),

			admin: Yup.boolean(),
		});
		try {
			schema.validateSync(request.body, { abortEarly: false, strict: true });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name, email, password, admin } = request.body;

		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return response.status(400).json({ error: 'Email already taken!' });
		}

        const password_hash = await bcrypt.hash(password, 10);


		const user = await User.create({
			id: v4(),
			name,
			email,
			password_hash,
			admin,
		});

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
		});
	}
}

export default new UserController();
