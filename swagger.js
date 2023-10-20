export default {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'Nnergix API Test',
			version: '0.1.0',
			description: 'This is an API REST for Nnergix Test.',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html'
			},
			contact: {
				name: 'Marcos Castillo',
				url: '',
				email: ''
			}
		},
		servers: [
			{
				url: 'http://localhost:3000'
			}
		]
	},
	apis: ['./routes/*.js']
};
