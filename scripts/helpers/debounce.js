/**
 * Debounce implementation
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds for the delay of the callback function. Default is 200ms.
 *
 * @return Debounced callback.
 */
export function debounce(func, wait = 250) {
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
