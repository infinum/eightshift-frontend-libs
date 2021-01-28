/**
 * Escapes a string
 *
 * Removes 'unsafe' characters from a string.
 *
 * @param {string} string String to escape.
 *
 * @return Escaped string.
 */
export const escapeString = (string) => string.replace(/([;&,.+*~':"!^#$%@[\]()=>|])/g, '\\$1');
