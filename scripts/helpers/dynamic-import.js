/**
 * Loop all paths required using require.context method.
 * Used to get (require) all the files using the `require.context` method.
 * It will find all files recursively in the folder using a regex.
 *
 * @param {object} paths - All `require.context` paths to iterate.
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * dynamicImport(require.context('./../../custom', true, /assets\/index.js$/));
 * ```
 */
export function dynamicImport(paths) {
	paths.keys().forEach(paths);
}
