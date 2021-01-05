const path = require('path');

module.exports = ({ config }) => require('./../webpack/storybook')(
	{ config },
	path.resolve(__dirname, '..'),
	'blocks/init/src/Blocks/manifest.json',
	false
);
