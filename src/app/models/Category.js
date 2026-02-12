import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				image_url: Sequelize.STRING,
				public_id: Sequelize.STRING,
			},
			{
				sequelize,
				tableName: 'categories',
			},
		);

		return this;
	}

}

export default Category;
