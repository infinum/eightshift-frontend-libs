/**
 * Convert the first letter of the string to uppercase.
 *
 * @param {string} str - String to convert to first letter uppercase.
 *
 * @returns {string} - String with the first letter uppercase.
 *
 * Usage:
 * ```js
 * ucfirst('custom');
 * ```
 *
 * Output:
 * ```js
 * Custom
 * ```
 */
export function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
