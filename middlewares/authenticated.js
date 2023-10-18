import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		return res.status(401).json({
			error: {
				message: 'No auth header found in request.'
			}
		});
	}

	if (!authHeader.startsWith('Bearer')) {
		return res.status(401).json({
			error: {
				message: 'No bearer token provided.'
			}
		});
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			error: {
				message: 'Token is missing.'
			}
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({
				error: {
					message: 'Invalid access token.'
				}
			});
		}
		req.user = user;
		next();
	});
};
