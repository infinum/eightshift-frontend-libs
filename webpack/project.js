/**
 * Project config used only in development and production build.
 *
 */

const fs = require('fs');

module.exports = (options) => {
	const entry = {};
	const output = {
		path: options.config.outputPath,
		publicPath: options.config.publicPath,

		// These 2 fix the error we were having on projects with both theme + plugin using boilerplate (for example
		// theme + Eightshift Forms) where we would sometimes get the following error:
		//
		// applicationBlocks.js?ver=1.0.0:64 Uncaught (in promise) TypeError: Cannot read property 'call' of undefined
		// at __webpack_require__
		//
		// Fix source: https://github.com/webpack/webpack/issues/959#issuecomment-546506221
		library: '[name]',
		umdNamedDefine: false,
	};

	// Load Application Entrypoint.
	if (!options.overrides.includes('application') && fs.existsSync(options.config.applicationEntry)) {
		entry.application = options.config.applicationEntry;
	}

	// Load ApplicationAdmin Entrypoint.
	if (!options.overrides.includes('applicationAdmin') && fs.existsSync(options.config.applicationAdminEntry)) {
		entry.applicationAdmin = options.config.applicationAdminEntry;
	}

	// Load ApplicationBlocks Entrypoint.
	if (!options.overrides.includes('applicationBlocks') && fs.existsSync(options.config.applicationBlocksEntry)) {
		entry.applicationBlocks = options.config.applicationBlocksEntry;
	}

	// Load ApplicationBlocksEditor Entrypoint.
	if (!options.overrides.includes('applicationBlocksEditor') && fs.existsSync(options.config.applicationBlocksEditorEntry)) {
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
