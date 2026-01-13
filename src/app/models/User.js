import Sequelize, { DataTypes, Model } from 'sequelize';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					primaryKey: true,
					allowNull: false,
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
				},
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password_hash: Sequelize.STRING,
				admin: Sequelize.BOOLEAN,
			},
			{
				sequelize,
				tableName: 'users',
			},
		);

		return this;
	}
}

export default User;
