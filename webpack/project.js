/**
 * Project config used only in development and production build.
 *
 * @since 2.0.0
 */

const { isUsed } = require('./helpers');

module.exports = (options) => {
  const entry = {};
  const output = {
    path: options.config.outputPath,
    publicPath: options.config.publicPath,
  };

  // Load Application Entrypoint.
  if (isUsed(options.overrides, 'application')) {
    entry.application = options.config.applicationEntry;
  }

  // Load ApplicationAdmin Entrypoint.
  if (isUsed(options.overrides, 'applicationAdmin')) {
    entry.applicationAdmin = options.config.applicationAdminEntry;
  }

  // Load ApplicationBlocks Entrypoint.
  if (isUsed(options.overrides, 'applicationBlocks')) {
    entry.applicationBlocks = options.config.applicationBlocksEntry;
  }

  // Load ApplicationBlocksEditor Entrypoint.
  if (isUsed(options.overrides, 'applicationBlocksEditor')) {
    entry.applicationBlocksEditor = options.config.applicationBlocksEditorEntry;
  }

  // Load filename Output.
  if (isUsed(options.overrides, 'filename')) {
    output.filename = `${options.config.filesOutput}.js`;
  }

  return {
    entry,
    output,
  };
};
