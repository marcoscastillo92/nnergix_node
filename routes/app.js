import express from 'express';
import { docs, links } from '../controllers/app.js';
import isAuthenticated from '../middlewares/authenticated.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { linksPayload } from '../schemas/app.js';

const router = express.Router();

router.post('/', docs);
router.post(
	'/links',
	isAuthenticated,
	schemaValidator.verify(linksPayload),
	links
);
router.post('/links/anonymous', schemaValidator.verify(linksPayload), links);

export default router;
