#!/usr/bin/env node
import { retrieveLinksFromUrl } from './controllers/app.js';
import db from './db.js';

const [, , ...args] = process.argv;
const URL_REGEX =
	/^(http|https):\/\/(?<domain>\w+\.\w+)(?<path>\/\w*(\.\w+|\?)?)?(?<querystring>.*)$/;

function validateArguments(args) {
	let errors = false;
	if (args.length === 0) {
		errors = true;
		console.error(
			'Missing commands argument. Use example: commandName http://example.com'
		);
	}

	if (args.length > 1) {
		errors = true;
		console.error(
			'Too many arguments. Use example: commandName http://example.com'
		);
	}

	if (args.length && !args[0].match(URL_REGEX)) {
		errors = true;
		console.error(
			`Invalid argument, needs to be a valid url.
        Examples of valid URLs: 
          https://example.com
          http://example.com
          http://example.com/
          http://example.com/path/to/resource
          http://example.com/path/to/resource.ext
          http://example.com/path/to/resource?param=value
          http://example.com/path/to/resource.ext?param=value
    
          ext = extension file
        `
		);
	}

	return !errors;
}

if (!validateArguments(args)) {
	process.exit(1);
}

db.init(() => {
	console.log('Database initialized');
});

retrieveLinksFromUrl(args[0]).then((anchors) => {
	console.log(anchors);
	process.exit(0);
});
