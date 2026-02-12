import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
<<<<<<< HEAD
				image_url: Sequelize.STRING,
				public_id: Sequelize.STRING,
=======
				path: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `https://dev-burguer-backend.xgg4n8.easypanel.host/category-file/${this.path}`;
					},
				},
>>>>>>> 12a2a8722dd6cdd380cb405f19a7ed71ea56a287
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
