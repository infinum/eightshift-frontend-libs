/**
 * Returns a camel-cased string.
 *
 * @param {string} string Add string to convert.
 *
 * @return Camel cased string.
 */
export const camelize = (stringParam) => {
	const string = stringParam.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
			return match.charAt(match.length-1).toUpperCase();
	});

	return string.charAt(0).toLowerCase() + string.substring(1);
}
