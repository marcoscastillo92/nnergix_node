export const loginPayload = {
	type: 'object',
	properties: {
		email: {
			type: 'string'
		},
		password: {
			type: 'string'
		}
	},
	required: ['email', 'password'],
	additionalProperties: false
};

export const registerPayload = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
		},
		password: {
			type: 'string'
		},
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		}
	},
	required: ['email', 'password', 'firstName', 'lastName'],
	additionalProperties: false
};
