/**
 * Truncates a string to a certain length, separating it in the middle.
 *
 * Example: _I'm a tr...d string_.
 *
 * @param {string} input             - Input string.
 * @param {Number} maxLength         - Maximum allowed length of the string.
 * @param {string} [separator='...'] - Separator to use.
 *
 * @returns {string} Truncated string.
 */
 export const truncateMiddle = (input, maxLength, separator = '...') => {
	if (input?.length <= maxLength) {
		return input;
	}

	return `${input.slice(0, maxLength / 2)}${separator}${input.slice(-1 * (maxLength / 2 - 3))}`;
}

/**
 * Unescapes HTML entities.
 *
 * @param {string} input - Input string.
 *
 * @returns {string} String with HTML entities unescaped.
 */
export const unescapeHTML = (input) =>
	input.replace(
		/&amp;|&lt;|&gt;|&#39;|&#38;|&#039;|&#038;|&quot;/g,
		tag =>
		({
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&#39;': "'",
			'&#38;': "&",
			'&#039;': "'",
			'&#038;': "&",
			'&quot;': '"'
		}[tag] || tag)
	);
