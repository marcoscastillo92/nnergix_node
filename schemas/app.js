export const linksPayload = {
	type: 'object',
	properties: {
		url: {
			type: 'string'
		}
	},
	required: ['url'],
	additionalProperties: false
};
