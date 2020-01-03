/* eslint-disable valid-typeof */

/**
 * File holding webpack helpers used to create project webpack build setup.
 *
 * @since 2.0.0
 */

const path = require('path');

/**
 * Generate all paths required for Webpack build to work.
 *
 * @param {string} projectDir Current project directory absolute path.
 * @param {string} proxyUrl Used for providing browsersync functionality.
 * @param {string} projectPathConfig Project path relative to project root.
 * @param {string} assetsPathConfig Assets path after projectPath location.
 * @param {string} outputPathConfig Public output path after projectPath location.
 *
 * @since 2.0.0
 */
function getConfig(projectDir, proxyUrl, projectPathConfig, assetsPathConfig, outputPathConfig) {

  if (typeof projectDir === 'undefined') {
    throw 'projectDir parameter is empty, please provide. This key represents: Current project directory absolute path. For example: __dirname'; // eslint-disable-line no-throw-literal
  }

  if (typeof proxyUrl === 'undefined') {
    throw 'proxyUrl parameter is empty, please provide. This key represents: Development Url for providing browsersync functionality. For example: dev.boilerplate.com'; // eslint-disable-line no-throw-literal
  }

  if (typeof projectPathConfig === 'undefined') {
    throw 'projectPath parameter is empty, please provide. This key represents: Project path relative to project root. For example: wp-content/themes/eightshift-boilerplate'; // eslint-disable-line no-throw-literal
  }

  if (typeof assetsPathConfig === 'undefined') {
    throw 'assetsPath parameter is empty, please provide. This key represents: Assets path after projectPath location. For example: src/blocks/assets'; // eslint-disable-line no-throw-literal
  }

  if (typeof outputPathConfig === 'undefined') {
    throw 'outputPath parameter is empty, please provide. This key represents: Public output path after projectPath location. For example: public'; // eslint-disable-line no-throw-literal
  }

  // Clear all slashes from user config.
  const projectPathConfigClean = projectPathConfig.replace(/^\/|\/$/g, '');
  const assetsPathConfigClean = assetsPathConfig.replace(/^\/|\/$/g, '');
  const outputPathConfigClean = outputPathConfig.replace(/^\/|\/$/g, '');

  // Create absolute path from the projects relative path.
  const absolutePath = `${projectDir}`;

  return {
    proxyUrl,
    absolutePath,

    libNodeModules: path.resolve(absolutePath, 'node_modules'),

    // Output files absolute location.
    outputPath: path.resolve(absolutePath, outputPathConfigClean),

    // Output files relative location, added before every output file in manifes.json. Should start and end with "/".
    publicPath: path.join('/', projectPathConfigClean, outputPathConfigClean, '/'),

    // Source files entries absolute locations.
    applicationEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application.js'),
    applicationAdminEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application-admin.js'),
    applicationBlocksEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application-blocks.js'),
    applicationBlocksEditorEntry: path.resolve(absolutePath, assetsPathConfigClean, 'application-blocks-editor.js'),
  };
}

/**
 * Check if user config is added and it is used
 *
 * @param {object} config Config object to check.
 * @param {string} key Config object key to test if is false.
 *
 * @since 2.0.0
 */
function isUsed(config, key) {
  if (config.hasOwnProperty(key) || config[key]) {
    return false;
  }

  return true;
}

module.exports = {
  getConfig,
  isUsed,
};
