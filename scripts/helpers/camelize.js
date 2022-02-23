/**
 * Returns a *camelCase*-formatted string.
 *
 * @param {string} string - String to convert.
 *
 * @return {string} *camelCase*-formatted string.
 */
export const camelize = (stringParam) => {
	const string = stringParam.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
			return match.charAt(match.length-1).toUpperCase();
	});

	return string.charAt(0).toLowerCase() + string.substring(1);
};
