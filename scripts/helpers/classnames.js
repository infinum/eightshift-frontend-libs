/**
 * Converts an array of classes into a string.
 *
 * @param {array} classnamesArray Array of classes.
 *
 * @return string
 */
export function classnames(classnamesArray) {
	return classnamesArray.map(className => className.trim()).filter(String).join(' ').trim();
}
