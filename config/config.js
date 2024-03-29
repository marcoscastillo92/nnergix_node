import dotenv from 'dotenv';

dotenv.config();
export default {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME_DEV,
		host: process.env.DB_HOST_DEV,
		port: process.env.DB_PORT_DEV,
		dialect: process.env.DB_DIALECT
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME_TEST,
		host: process.env.DB_HOST_DEV,
		port: process.env.DB_PORT_DEV,
		dialect: process.env.DB_DIALECT
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT
	}
};
