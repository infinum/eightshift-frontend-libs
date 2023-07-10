/**
 * Separated implementation of throttle functionality due to additional parameter in implementation.
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds of the callback function lock. Default is 250ms.
 * @param {number} after  - If function is needed to be launched before or after throttling.
 *
 * @access public
 *
 * @return {function} Throttled callback.
 */
export function throttle(func, wait = 250, after = false) {
	let timeout;
	let lock = after;

	return function(...args) {
		clearTimeout(timeout);
		if (!lock) {
			lock = true;

			if (!after) {
				func.apply(this, args);
			}
		}

		timeout = setTimeout(() => {
			lock = false;

			if (after) {
				func.apply(this, args);
			}
		}, wait);
	};
}
