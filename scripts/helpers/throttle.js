import justThrottle from 'just-throttle';

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
export const throttle = (func, wait = 250, after = false) => justThrottle(func, wait, { leading: !after, trailing: after });
