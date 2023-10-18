import AJV from 'ajv';

export default {
	verify: (schema) => {
		if (!schema) {
			throw new Error('Schema not provided');
		}

		return (req, res, next) => {
			const { body } = req;
			const ajv = new AJV({ allErrors: true });
			const validate = ajv.compile(schema);
			const isValid = validate(body);

			if (isValid) {
				return next();
			}

			return res.send({
				status: false,
				error: {
					message: `Invalid payload: ${ajv.errorsText(validate.errors)}`
				}
			});
		};
	}
};
