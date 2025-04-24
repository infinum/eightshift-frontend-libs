/**
 * Project Production config used only in production build.
 *
 */

import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

export default (options) => {
	// Enable Webpack caching for production
	const cache = true;

	// All Plugins used in production build.
	const plugins = [];

	// All Optimizations used in production build.
	const optimization = {
		minimize: true,
		minimizer: [],
	};

	// Plugin used to minify output.
	if (!options.overrides.includes("terserPlugin")) {
		optimization.minimizer.push(
			new TerserPlugin({
				parallel: true,
				minify: TerserPlugin.swcMinify,
				terserOptions: {
					compress: {
						drop_console: true,
						passes: 2,
					},
					format: {
						comments: false,
					},
				},
			})
		);
	}

	if (!options.overrides.includes("cssMinimizerPlugin")) {
		optimization.minimizer.push(
			new CssMinimizerPlugin({
				parallel: true,
				minify: CssMinimizerPlugin.lightningCssMinify,
				minimizerOptions: {
					targets: browserslistToTargets(browserslist(">= 0.25%")),
				},
			})
		);
	}

	return {
		plugins,
		optimization,
		cache,
	};
};
