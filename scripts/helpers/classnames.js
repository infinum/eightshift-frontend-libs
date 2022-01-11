/**
 * Converts an array of classes into a string.
 *
 * @param {array} classnamesArray Array of classes.
 *
 * @return string
 */
export function classnames(classnamesArray) {
	return classnamesArray.filter(String).join(' ').trim();
}
