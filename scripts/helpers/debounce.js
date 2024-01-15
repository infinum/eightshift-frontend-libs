import justDebounceIt from 'just-debounce-it';

/**
 * Debounces the provided function.
 * For more information, check [this blog post](https://davidwalsh.name/javascript-debounce-function).
 *
 * @param {function} func - Callback to apply.
 * @param {number} wait   - Number of milliseconds for the delay of the callback function. Default is 200ms.
 *
 * @access public
 *
 * @return {function} Debounced callback.
 *
 * Usage:
 * ```js
 * debounce(() => {
 *   // callback function.
 * }, 250);
 * ```
 */
export const debounce = (func, wait = 250) => justDebounceIt(func, wait);
