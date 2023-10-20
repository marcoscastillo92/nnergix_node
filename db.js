import models from './models/index.js';
import Sequelize from 'sequelize';
import config from './config/config.js';

const sequelizeConfig = config[process.env.NODE_ENV];
if (!sequelizeConfig) {
	console.error('Environment not set');
	process.exit(1);
}

const sequelize = new Sequelize(
	sequelizeConfig.database,
	sequelizeConfig.username,
	sequelizeConfig.password,
	{
		dialect: sequelizeConfig.dialect,
		host: sequelizeConfig.host,
		port: sequelizeConfig.port,
		logging: process.env.NODE_ENV !== 'test' ? console.log : false
	}
);

models.forEach((model) => {
	model.initialise(sequelize);
});

export default {
	init: (callback) => {
		sequelize
			.sync()
			.then(() => {
				if (callback) callback();
			})
			.catch((err) => {
				console.error('Sequelize error:', err);
				process.exit(1);
			});
	},
	sequelize
};
