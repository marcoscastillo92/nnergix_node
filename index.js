import express from 'express';
import models from './models/index.js';
import routes from './routes/index.js';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

sequelize
	.sync()
	.then(() => {
		routes.forEach((route) => {
			app.use(route.path, route.router);
		});

		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.error('Sequelize error:', err);
	});
