/**
 * Slices the string in the middle and inputs the provided separator so that the string is maxLength characters long.
 *
 * @param {string} input             - String to slice.
 * @param {number} maxLength         - Maximum allowed string length. Should be at least 8.
 * @param {string} [separator='...'] - Separator to insert. Should be exactly three characters long.
 *
 * @access public
 *
 * @returns {string} Truncated string.
 *
 * Usage:
 * ```js
 * truncateMiddle('https://eightshift.com/contact/', 22);
 * ```
 *
 * Output:
 * ```js
 * "https://eig...contact/"
 */
export const truncateMiddle = (input, maxLength, separator = '...') => {
	if (input?.length <= maxLength) {
		return input;
	}

	return `${input.slice(0, maxLength / 2)}${separator}${input.slice(-1 * (maxLength / 2 - 3))}`;
};

/**
 * Un-escapes HTML entities.
 *
 * @param {string} input - Input string.
 *
 * @access public
 *
 * @returns {string} String with HTML entities unescaped.
 *
 * Usage:
 * ```js
 * unescapeHTML('Test&#38;Up');
 * ```
 *
 * Output:
 * ```js
 * Test&Up
 */
export const unescapeHTML = (input) =>
	input.replace(
		/&amp;|&lt;|&gt;|&#39;|&#38;|&#039;|&#038;|&quot;|&#8211;/g,
		tag =>
		({
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&#39;': "'",
			'&#38;': "&",
			'&#039;': "'",
			'&#038;': "&",
			'&quot;': '"',
			'&#8211;': '-',
		}[tag] || tag)
	);
