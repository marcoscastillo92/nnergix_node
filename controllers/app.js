import { load } from 'cheerio';
import LinkModel from '../models/link.js';

export const links = async (req, res) => {
	const { url } = req.body;
	const { user } = req;

	try {
		const existingLink = await LinkModel.findLink({ url });
		if (existingLink) {
			return res.status(200).json({
				anchors: JSON.parse(existingLink.anchors)
			});
		}

		const response = await fetch(url);
		const html = await response.text();
		const $ = load(html);
		const anchors = [];
		$('a').each((_, element) => {
			const href = $(element).attr('href');
			anchors.push(href);
		});

		if (user) {
			LinkModel.createLink({
				url,
				anchors: JSON.stringify(anchors),
				userId: user.id
			});
		}

		return res.status(200).json({
			anchors
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al hacer scrapping de la URL' });
	}
};

export const docs = (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API!'
	});
};
