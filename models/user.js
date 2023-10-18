import { DataTypes } from 'sequelize';

const UserModel = {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	}
};

export default {
	initialise: function (sequelize) {
		this.model = sequelize.define('user', UserModel);
	},

	createUser: function (user) {
		return this.model.create(user);
	},

	findUser: function (query) {
		return this.model.findOne({
			where: query
		});
	}
};
