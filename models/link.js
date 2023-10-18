import { DataTypes } from 'sequelize';

const LinkModel = {
	url: {
		type: DataTypes.STRING,
		allowNull: false
	},
	anchors: {
		type: DataTypes.TEXT,
		allowNull: false
	}
};

export default {
	initialise: function (sequelize) {
		this.model = sequelize.define('link', LinkModel);
		this.model.belongsTo(sequelize.models.user);
	},

	createLink: function (link) {
		return this.model.create(link);
	},

	findLink: function (query) {
		return this.model.findOne({
			where: query
		});
	},

	findLinks: function (query) {
		return this.model.findAll({
			where: query
		});
	}
};
