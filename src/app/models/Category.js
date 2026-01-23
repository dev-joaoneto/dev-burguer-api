import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `https://dev-burguer-backend.xgg4n8.easypanel.host/category-file/${this.path}`;
					},
				},
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
