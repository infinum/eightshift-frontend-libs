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
function getConfig(projectDir, proxyUrl, projectPathConfig, assetsPathConfig = 'assets', blocksAssetsPathConfig = 'src/blocks/assets', outputPathConfig = 'public') {

  if (typeof projectDir === 'undefined') {
    throw 'projectDir parameter is empty, please provide. This key represents: Current project directory absolute path. For example: __dirname'; // eslint-disable-line no-throw-literal
  }

  if (typeof proxyUrl === 'undefined') {
    throw 'proxyUrl parameter is empty, please provide. This key represents: Development Url for providing browsersync functionality. For example: dev.boilerplate.com'; // eslint-disable-line no-throw-literal
  }

  if (typeof projectPathConfig === 'undefined') {
    throw 'projectPath parameter is empty, please provide. This key represents: Project path relative to project root. For example: wp-content/themes/eightshift-boilerplate'; // eslint-disable-line no-throw-literal
  }

  // Clear all slashes from user config.
  const projectPathConfigClean = projectPathConfig.replace(/^\/|\/$/g, '');
  const assetsPathConfigClean = assetsPathConfig.replace(/^\/|\/$/g, '');
  const blocksAssetsPathConfigClean = blocksAssetsPathConfig.replace(/^\/|\/$/g, '');
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
    applicationBlocksEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks.js'),
    applicationBlocksEditorEntry: path.resolve(absolutePath, blocksAssetsPathConfigClean, 'application-blocks-editor.js'),
  };
}

module.exports = {
  getConfig,
};
