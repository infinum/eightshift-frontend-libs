/**
 * Project Base overrides used in production and development build.
 *
 */

import webpack from 'webpack';
import * as sass from 'sass'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { convertJsonToSass } from './helpers.mjs';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';

export default (options) => {

	// All Plugins used in production and development build.
	const plugins = [];

	// Provide global variables to window object.
	if (!options.overrides.includes('providePlugin')) {
		plugins.push(new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}));
	}

	// Provide variables to code build.
	if (!options.overrides.includes('definePlugin')) {
		plugins.push(new webpack.DefinePlugin({
			'process.env.VERSION': JSON.stringify(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
			'process.browser': true,
		}));
	}

	// Output css from Js.
	if (!options.overrides.includes('miniCssExtractPlugin')) {
		plugins.push(new MiniCssExtractPlugin({
			filename: `${options.config.filesOutput}.css`,
		}));
	}

	// Create manifest.json file.
	if (!options.overrides.includes('webpackManifestPlugin')) {
		plugins.push(new WebpackManifestPlugin());
	}

	// Enable export for all WordPress related packages
	if (!options.overrides.includes('dependencyExtractionWebpackPlugin')) {
		plugins.push(
			new DependencyExtractionWebpackPlugin({
				outputFormat: 'json',
			}),
		);
	}

	// All module used in production and development build.
	const module = {
		rules: [],
	};

	// Module for JS and JSX.
	if (!options.overrides.includes('js')) {
		module.rules.push({
			test: /\.(js|jsx)$/,
			exclude: /node_modules[\\/](?!@eightshift)/,
			use: {
				loader: 'swc-loader',
			},
		});
	}

	// Module for Scss and Css.
	if (!options.overrides.includes('css')) {
		module.rules.push({
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
				},
				{
					loader: 'postcss-loader',
				},
				{
					loader: 'sass-loader',
					options: {
						implementation: sass,
						additionalData: convertJsonToSass(options.config.blocksManifestSettingsPath) + ' ' + convertJsonToSass(options.config.blocksManifestSettingsPath, 'config', 'global-config'),
					},
				},
			],
		});

		module.rules.push({
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
				},
				{
					loader: 'postcss-loader',
				},
			],
		});

		module.rules.push({
			test: /\.css$/,
			include: /node_modules/,
			use: [
				{
					loader: 'css-loader',
				},
			],
		});

		module.rules.push({
			test: /\.(woff2|ttf|otf)$/i,
			type: 'asset/resource',
			include: /node_modules\/@eightshift/,
		});
	}

	// Module for Images.
	if (!options.overrides.includes('images')) {
		module.rules.push({
			test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/i,
			exclude: [/fonts/, /node_modules/],
			type: 'asset/resource',
		});
	}

	const resolve = {
		symlinks: false,
	};

	return {
		plugins,
		module,
		resolve
	};
};
