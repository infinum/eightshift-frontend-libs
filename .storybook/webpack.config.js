/* eslint-disable global-require*/

const path = require('path');

module.exports = ({ config }) => require('./../webpack/storybook')(
	{ config },
	path.resolve(__dirname, '..'),
	'blocks/init/src/blocks/manifest.json',
	false
);
