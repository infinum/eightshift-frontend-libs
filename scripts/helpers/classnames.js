/**
 * Converts an array of classes into a string.
 *
 * @param {array} classnamesArray Array of classes.
 *
 * @return string
 */
export function classnames(classnamesArray) {
	if (!Array.isArray(classnamesArray)) {
		throw Error('First argument of classnames function needs to be of type array');
	}

	return classnamesArray.map(className => className.trim()).filter(String).join(' ').trim();
}
