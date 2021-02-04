/**
 * File holding webpack helpers used to create project webpack build setup.
 *
 */

const path = require('path');

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
		useSsl = false
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
 * Convert Recursive Json data only for colors to SASS valid output.
 *
 * @param {object} data Json data only for colors.
 */
function convertJsonColorsToSass(data) {
	let output = '';

	for (const property in data) {
		if (Object.prototype.hasOwnProperty.call(data, property)) {

			if (typeof data[property] === 'string' && (property === 'color' || property === 'gradient')) {
				output += data[property];
			}

			if (typeof data[property] === 'object') {
				output += `${data[property].slug}: ${convertJsonColorsToSass(data[property])},`;
			}
		}
	}

	return output;
}

/**
 * Convert Recursive Json data to SASS valid output.
 *
 * @param {object} data Json data to convert.
 */
function convertJsonToSassGeneral(data) {
	let output = '';

	for (const property in data) {
		if (Object.prototype.hasOwnProperty.call(data, property)) {
			switch (typeof data[property]) {
				case 'object':
					if (property === 'colors' || property === 'gradient') {
						output += `${property}: (${convertJsonColorsToSass(data[property])}),`;
					} else {
						output += `${property}: (${convertJsonToSassGeneral(data[property])}),`;
					}
					break;
				default:
					output += `${property}: ${data[property]},`;
					break;
			}
		}
	}

	return output;
}

/**
 * Convert Json to SASS valid output and prefix it with map key.
 *
 * @param {object} data Json Data object.
 */
function convertJsonToSass(data = {}) {
	return (data === '') ? '' : `$global-variables: (${convertJsonToSassGeneral(data.globalVariables)});`;
}

module.exports = {
	getConfig,
	convertJsonToSass,
};
