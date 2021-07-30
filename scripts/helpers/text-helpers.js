/**
 * Slices the string and inputs the provided separator after the specified characters.
 *
 * @param {string} input             - String to slice.
 * @param {number} maxLength         - Number to characters to slice.
 * @param {string} [separator='...'] - Separator to insert.
 *
 * @returns {string}
 *
 * Usage:
 * ```js
 * truncateMiddle('https://eightshift.com/contact/', 22);
 * ```
 *
 * Output:
 * ```js
 * https://eightshift.com...
 */
export const truncateMiddle = (input, maxLength, separator = '...') => {
	if (input?.length <= maxLength) {
		return input;
	}

	return `${input.slice(0, maxLength / 2)}${separator}${input.slice(-1 * (maxLength / 2 - 3))}`;
}
