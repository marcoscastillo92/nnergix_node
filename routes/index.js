import appRouter from './app.js';
import authorizetionRouter from './authorization.js';

export default [
	{
		path: '/',
		router: appRouter
	},
	{
		path: '/auth',
		router: authorizetionRouter
	}
];
