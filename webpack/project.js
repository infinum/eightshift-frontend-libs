/**
 * Project config used only in development and production build.
 *
 */

const fileExists = require('file-exists');

module.exports = (options) => {
	const entry = {};
	const output = {
		path: options.config.outputPath,
		publicPath: options.config.publicPath,
	};

	// Load Application Entrypoint.
	if (!options.overrides.includes('application') && fileExists.sync(options.config.applicationEntry)) {
		entry.application = options.config.applicationEntry;
	}

	// Load ApplicationAdmin Entrypoint.
	if (!options.overrides.includes('applicationAdmin') && fileExists.sync(options.config.applicationAdminEntry)) {
		entry.applicationAdmin = options.config.applicationAdminEntry;
	}

	// Load ApplicationBlocks Entrypoint.
	if (!options.overrides.includes('applicationBlocks') && fileExists.sync(options.config.applicationBlocksEntry)) {
		entry.applicationBlocks = options.config.applicationBlocksEntry;
	}

	// Load ApplicationBlocksEditor Entrypoint.
	if (!options.overrides.includes('applicationBlocksEditor') && fileExists.sync(options.config.applicationBlocksEditorEntry)) {
		entry.applicationBlocksEditor = options.config.applicationBlocksEditorEntry;
	}

	// Load filename Output.
	if (!options.overrides.includes('filename')) {
		output.filename = `${options.config.filesOutput}.js`;
	}

	return {
		entry,
		output,
	};
};
