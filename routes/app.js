/**
 * @swagger
 * tags:
 *   name: Links
 *   description: Get links from website
 * /links:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Get links from website with authentication
 *     tags: [Links]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *             required:
 *               - url
 *     responses:
 *       200:
 *         description: All anchors from passed url.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 anchors:
 *                   type: string
 *                   description: All anchors from passed url
 *       400:
 *         description: Url is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error when scrapping the URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /links/anonymous:
 *   post:
 *     summary: Get links from website without authentication
 *     tags: [Links]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *             required:
 *               - url
 *     responses:
 *       200:
 *         description: All anchors from passed url.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 anchors:
 *                   type: string
 *                   description: All anchors from passed url
 *       400:
 *         description: Url is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error when scrapping the URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 */

import express from 'express';
import { links } from '../controllers/app.js';
import isAuthenticated from '../middlewares/authenticated.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { linksPayload } from '../schemas/app.js';

const router = express.Router();

router.post(
	'/links',
	isAuthenticated,
	schemaValidator.verify(linksPayload),
	links
);
router.post('/links/anonymous', schemaValidator.verify(linksPayload), links);

export default router;
