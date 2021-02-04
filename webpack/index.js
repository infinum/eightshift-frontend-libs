/**
 * Main entrypoint location for webpack config.
 *
 */

const { merge } = require('webpack-merge');
const { getConfig } = require('./helpers');

module.exports = (mode, optionsData = {}) => {

	// All config and default setting overrides must be provided using this object.
	const options = {
		config: {},
		overrides: [],
		...optionsData,
	};

	// Append project config using getConfig helper.
	options.config = getConfig(
		optionsData.config.projectDir,
		optionsData.config.projectUrl,
		optionsData.config.projectPath,
		optionsData.config.assetsPath,
		optionsData.config.blocksAssetsPath,
		optionsData.config.outputPath,
		optionsData.config.blocksManifestSettingsPath,
		optionsData.config.useSsl
	);

	options.config.mode = mode;
	options.config.filesOutput = (mode === 'production' ? '[name]-[hash]' : '[name]');

	// Get all webpack partials.
	const base = require('./base')(options);
	const project = require('./project')(options);
	const development = require('./development')(options);
	const production = require('./production')(options);

	// Default output that is going to be merged in any env.
	const outputDefault = merge(project, base);

	// Output development setup by default.
	let output;

	// Output production setup if mode is set inside package.json.
	if (mode === 'production') {
		output = merge(outputDefault, production);
	} else {
		output = merge(outputDefault, development);
	}

	return output;
};
