import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database.cjs';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';
import 'dotenv/config';

const models = [User, Product, Category];
class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			.map((model) =>
				model.associate && model.associate(this.connection.models)
			);
	}

	mongo() {
		this.connection = mongoose.connect(
			process.env.MONGO_URL
		)
		.then(() => {
      		console.log('MongoDB connected successfully');
    })
    	.catch(err => {
      		console.error('MongoDB connection error:', err.message);
      		process.exit(1);
    });
		}
	}

export default new Database();
