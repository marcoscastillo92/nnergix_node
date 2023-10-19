import models from './models/index.js';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
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
	}
};
