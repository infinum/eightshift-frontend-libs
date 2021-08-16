/**
 * Escapes a string
 *
 * Takes the provided string and removes special characters. Characters that will be removed: `([;&,.+*~':"!^#$%@[\]()=>|]`.
 *
 * @param {string} string - String to escape.
 *
 * @return Escaped string.
 *
 * Usage:
 * ```js
 * escapeString.escapeString('Speci^al stri&n$g');
 * ```
 *
 * Output:
 * ```js
 * Special string
 * ```
 */
export const escapeString = (string) => string.replace(/([;&,.+*~':"!^#$%@[\]()=>|])/g, '\\$1');
