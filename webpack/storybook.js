const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { convertJsonToSass } = require('./helpers');

module.exports = (
	{ config },
	projectRoot,
	blocksManifestSettingsPath,
	isProject = true
) => {

	/**
	 * Generate css file from sass.
	 */
	config.module.rules.push({
		test: /\.scss$/,
		exclude: /node_modules/,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					url: false,
				},
			},
			{
				loader: 'sass-loader',
				options: {
					implementation: require("sass"),
					additionalData: convertJsonToSass(path.resolve(projectRoot, blocksManifestSettingsPath)),
				},
			},
			{
				loader: 'import-glob-loader',
			},
		],
	});

	// Add include/exclude paths to all loaders.
	config.module.rules.map((item) => {
		item.exclude = /node_modules\/(?!(@eightshift|@wordpress)\/).*/;
		return item;
	});

	/**
	 * Extract css from sass.
	 */
	config.plugins.push(new MiniCssExtractPlugin());

	if (!isProject) {
		config.resolve.alias['@eightshift/frontend-libs'] = projectRoot;
	}

	return config;
};
