import { camelCase } from './es-dash';

/**
 * Returns a camelCase-formatted string.
 *
 * @param {string} string - String to convert.
 *
 * @access public
 *
 * @return {string} *camelCase*-formatted string.
 *
 * Usage:
 * ```js
 * camelize('New super Test-title') // => 'newSuperTestTitle'
 * ```
 */
export const camelize = (input) => camelCase(input);
