/**
 * Returns a camel-cased string.
 *
 * @param string string Add string to convert.
 */
export const camelize = (string) => {
	return string.replace(/-./g, (x) => x[1].toUpperCase());
};
