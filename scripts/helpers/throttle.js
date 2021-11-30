/**
 * Throttle implementation.
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds of the callback function lock. Default is 250ms.
 *
 * @return Throttled callback.
 */
export function throttle(func, wait = 250) {
	let timeout;
	let lock = true;

	return function(...args) {
		clearTimeout(timeout);
		if (!lock) {
			lock = true;
			func.apply(this, args);
		}

		timeout = setTimeout(() => {
			lock = false;
		}, wait);
	};
}
