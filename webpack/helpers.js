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
 * @param {string} projectPathConfig Project path relative to project root.
 * @param {string} assetsPathConfig Assets path after projectPath location.
 * @param {string} blocksAssetsPathConfig Path of the block assets.
 * @param {string} outputPathConfig Public output path after projectPath location.
 * @param {string} blocksManifestSettingsPath Main global settings manifest.json path after projectPath location.
 *
 */
function getConfig(
	projectDir,
	projectPathConfig,
	assetsPathConfig = 'assets',
	blocksAssetsPathConfig = 'src/Blocks/assets',
	outputPathConfig = 'public',
	blocksManifestSettingsPath = 'src/Blocks/manifest.json',
) {

	if (typeof projectDir === 'undefined') {
		throw Error('projectDir parameter is empty, please provide. This key represents: Current project directory absolute path. For example: __dirname');
	}

	if (typeof projectPathConfig === 'undefined') {
		// eslint-disable-next-line max-len
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
		applicationBlocksFrontendEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks-frontend.js'),

		blocksManifestSettingsPath: path.resolve(absolutePath, blocksManifestSettingsPathClean),
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
			continue;
		}

		output += `${key}: ${escapeSassMapComma(value)},`;
	}

	return output;
}

/**
 * Adds parentheses around the output if the value contains a comma.
 *
 * @param {any} input Input value.
 * @returns Input value with parentheses around the value if needed.
 */
function escapeSassMapComma(input) {
	if (typeof input === 'string' && input?.includes(',')) {
		return `(${input})`;
	}

	return input;
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
				output += `${innerValue['slug']}: ${escapeSassMapComma(innerValue['color'])},`;
				break;
			case 'gradients':
				output += `${innerValue['slug']}: ${escapeSassMapComma(innerValue['gradient'])},`;
				break;
			case 'fontSizes':
				output += `${innerKey}: ${escapeSassMapComma(innerValue['slug'])},`;
				break;
			default:
				if (Array.isArray(data)) {
					return output;
				}

				output += `${innerKey}: ${escapeSassMapComma(innerValue)},`;
				break;
		}
	}

	return output;
}

/**
 * Convert Json to SASS valid output and prefix it with map key.
 *
 * @param path Path to JSON file.
 * @param propertyName Name of the variable that will it be exported.
 * @param variableName Name of the variable that will it be exported.
 *
 * @return string Sass variable
 */
function convertJsonToSass(path, propertyName = 'globalVariables', variableName = 'global-variables') {
	let data = {};

	if (fs.existsSync(path)) {
		data = require(path);
	}

	if (Object.getOwnPropertyNames(data).length === 0 || !Object.prototype.hasOwnProperty.call(data, 'globalVariables')) {
		return '';
	}

	return `$${variableName}: (${convertJsonToSassMap(data[propertyName])});`;
}

module.exports = {
	getConfig,
	convertJsonToSass,
};
