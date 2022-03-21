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
 * "https://ei.../contact/"
 */
export const truncateMiddle = (input, maxLength, separator = '...') => {
	 // If the string is shorter than maxLength, just return it.
	 if (input?.length <= maxLength) {
		return input;
	  }
	
	  // Return error if separator would prevent any characters from the word showing.
	  if (separator.length + 1 > maxLength) {
		return new Error('Separator length exceeds the passed maximum length, string wouldn\'t be visible.');
	  }
	
	  // Smartly split up the string.
	  const maxStringLength = maxLength - separator.length;
	
	  const leftPartLength = Math.ceil(maxStringLength / 2);
	  const rightPartLength = Math.floor(maxStringLength / 2);
	
	  const leftPart = input.slice(0, leftPartLength).trim();
	  const rightPart = rightPartLength > 0 ? input.slice(-1 * rightPartLength).trim() : '';
	
	  return `${leftPart}${separator}${rightPart}`;
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
