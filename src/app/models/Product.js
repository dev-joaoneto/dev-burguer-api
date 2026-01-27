import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				path: Sequelize.STRING,
				offer: Sequelize.BOOLEAN,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `https://dev-burguer-backend.xgg4n8.easypanel.host/product-file/${this.path}`;
					},
				},
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
