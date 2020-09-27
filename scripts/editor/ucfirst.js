/**
 * Convert the first letter of the string to uppercase.
 *
 * @param {string} str String to convert to first letter uppercase.
 *
 */
export function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
