/**
 * File holding webpack helpers used to create project webpack build setup.
 *
 */

const path = require('path');
const fs = require('fs');

/**
 * Generate all paths required for Webpack build to work.
 *
 * @param {string} projectDir Current project directory absolute path.
 * @param {string} proxyUrl Used for providing browsersync functionality.
 * @param {string} projectPathConfig Project path relative to project root.
 * @param {string} assetsPathConfig Assets path after projectPath location.
 * @param {string} blocksAssetsPathConfig Path of the block assets.
 * @param {string} outputPathConfig Public output path after projectPath location.
 * @param {string} blocksManifestSettingsPath Main global settings manifest.json path after projectPath location.
 * @param {boolean} useSsl Change configuration if you have local ssl certificate, generally used only for BrowserSync.
 *
 */
function getConfig(
		projectDir,
		proxyUrl,
		projectPathConfig,
		assetsPathConfig = 'assets',
		blocksAssetsPathConfig = 'src/Blocks/assets',
		outputPathConfig = 'public',
		blocksManifestSettingsPath = 'src/Blocks/manifest.json',
		useSsl = false,
	) {

	if (typeof projectDir === 'undefined') {
		throw Error('projectDir parameter is empty, please provide. This key represents: Current project directory absolute path. For example: __dirname');
	}

	if (typeof proxyUrl === 'undefined') {
		throw Error('proxyUrl parameter is empty, please provide. This key represents: Development Url for providing browsersync functionality. For example: dev.boilerplate.com');
	}

	if (typeof projectPathConfig === 'undefined') {
		throw Error('projectPath parameter is empty, please provide. This key represents: Project path relative to project root. For example: wp-content/themes/eightshift-boilerplate');
	}

	// Clear all slashes from user config.
	const projectPathConfigClean = projectPathConfig.replace(/^\/|\/$/g, '');
	const assetsPathConfigClean = assetsPathConfig.replace(/^\/|\/$/g, '');
	const blocksAssetsPathConfigClean = blocksAssetsPathConfig.replace(/^\/|\/$/g, '');
	const outputPathConfigClean = outputPathConfig.replace(/^\/|\/$/g, '');
	const blocksManifestSettingsPathClean = blocksManifestSettingsPath.replace(/^\/|\/$/g, '');

	// Create absolute path from the projects relative path.
	const absolutePath = `${projectDir}`;

	return {
		proxyUrl,
		absolutePath,

		// Output files absolute location.
		outputPath: path.resolve(absolutePath, outputPathConfigClean),

		// Output files relative location, added before every output file in manifest.json. Should start and end with "/".
		publicPath: path.join('/', projectPathConfigClean, outputPathConfigClean, '/'),

		// Source files entries absolute locations.
		applicationEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application.js'),
		applicationAdminEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application-admin.js'),
		applicationBlocksEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks.js'),
		applicationBlocksEditorEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks-editor.js'),

		blocksManifestSettingsPath: path.resolve(absolutePath, blocksManifestSettingsPathClean),

		useSsl,
	};
}

/**
 * Convert Recursive Json data to SASS valid output.
 *
 * @param {object} data Json data to convert.
 */
function convertJsonToSassMap(data) {
	let output = '';

	for (const [key, value] of Object.entries(data)) {
		if (typeof value === 'object') {
			output += `${key}: (${convertJsonToSassMapInner(value, key)}),`;
		} else {
			output += `${key}: ${value},`;
		}
	}

	return output;
}

/**
 * Convert Recursive map object data to Sass map variables for inner objects.
 *
 * @param {object} data Object data to convert.
 * @param {string} key Parent string
 */
function convertJsonToSassMapInner(data, key) {
	let output = '';

	for (const [innerKey, innerValue] of Object.entries(data)) {
		switch (key) {
			case 'colors':
				output += `${innerValue['slug']}: ${innerValue['color']},`;
				break;
			case 'gradients':
				output += `${innerValue['slug']}: ${innerValue['gradient']},`;
				break;
			case 'fontSizes':
				output += `${innerKey}: ${innerValue['slug']},`;
				break;
			default:
				output += `${innerKey}: ${innerValue},`;
				break;
		}
	}

	return output;
}

/**
 * Convert Json to SASS valid output and prefix it with map key.
 *
 * @param {object} data Json Data object.
 */
function convertJsonToSass(path) {
	let data = {};

	if (fs.existsSync(path)) {
		data = require(path);
	}

	if (Object.getOwnPropertyNames(data).length === 0 || !Object.prototype.hasOwnProperty.call(data, 'globalVariables')) {
		return '';
	}

	return `$global-variables: (${convertJsonToSassMap(data['globalVariables'])});`;
}

module.exports = {
	getConfig,
	convertJsonToSass,
};
