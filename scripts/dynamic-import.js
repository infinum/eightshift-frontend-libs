/**
 * Loop all paths required using require.context method.
 *
 * @param {object} paths All require.context patch to iterate.
 *
 * @since 1.0.9 Changing to function.
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */
export function dynamicImport(paths) {
  paths.keys().forEach(paths);
}
