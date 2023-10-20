import express from 'express';
import routes from './routes/index.js';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach((route) => {
	app.use(route.path, route.router);
});

db.init(() => {
	app.listen(port, () => {
		if (process.env.NODE_ENV !== 'test') {
			console.log(`Server listening on port ${port}`);
		}
	});
});

export default app;
