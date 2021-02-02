/**
 * Debounce implementation
 *
 * @param {function} func Callback to apply.
 * @param {number} wait Number of seconds for the delay of the callback function.
 *
 * @return Debounced callback.
 */
export function debounce(func, wait) {
	let timeout;

	return function(...args) {
		const later = () => {
			timeout = null;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
