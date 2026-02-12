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
<<<<<<< HEAD
=======
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `https://dev-burguer-backend.xgg4n8.easypanel.host/product-file/${this.path}`;
					},
				},
>>>>>>> 12a2a8722dd6cdd380cb405f19a7ed71ea56a287
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
