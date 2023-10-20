import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const generateToken = (email, id) => {
	return jwt.sign(
		{
			id,
			email
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN
		}
	);
};

const encryptPassword = (password) => {
	const hash = crypto.createHash('sha256');
	hash.update(password);
	return hash.digest('hex');
};

export const singup = (req, res) => {
	const payload = req.body;
	const hashedPassword = encryptPassword(payload.password);

	UserModel.createUser(Object.assign(payload, { password: hashedPassword }))
		.then((user) => {
			const token = generateToken(payload.email, user.id);

			return res.status(201).json({
				token
			});
		})
		.catch((err) => {
			return res.status(500).json({
				error: err
			});
		});
};

export const login = (req, res) => {
	const { email, password } = req.body;

	UserModel.findUser({ email }).then((user) => {
		if (!user) {
			return res.status(401).json({
				error: `User \`${email}\` not found.`
			});
		}

		const hashedPassword = encryptPassword(password);

		if (user.password !== hashedPassword) {
			return res.status(401).json({
				error: `User \`${email}\` not found.`
			});
		}

		const token = generateToken(email, user.id);

		return res.status(200).json({
			token
		});
	});
};
