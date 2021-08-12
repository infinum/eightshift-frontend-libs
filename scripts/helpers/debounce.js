/**
 * Debounces the provided function.
 * For more information, check [this blog post](https://davidwalsh.name/javascript-debounce-function).
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of seconds for the delay of the callback function.
 *
 * @return Debounced callback.
 *
 * Usage:
 * ```js
 * debounce(() => {
 *   // callback function.
 * }, 250);
 * ```
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
