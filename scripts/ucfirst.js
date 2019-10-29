/**
 * Convert the first letter of the string to uppercase.
 *
 * @param {string} str String to convert to first letter uppercase.
 *
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */
export function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
