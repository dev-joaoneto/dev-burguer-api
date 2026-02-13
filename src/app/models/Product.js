import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				image_url: Sequelize.STRING,
				public_id: Sequelize.STRING,
				offer: Sequelize.BOOLEAN,
			},
			{
				sequelize,
				tableName: 'products',
			},
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.Category, { 
			foreignKey: 'category_id',
			as: 'category', 
		});
	}
}

export default Product;
