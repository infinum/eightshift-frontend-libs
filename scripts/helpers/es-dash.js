// Very lightweight Lodash replacements - from https://github.com/angus-c/just.
import justKebabCase from 'just-kebab-case';
import justCamelCase from 'just-camel-case';
import justPascalCase from 'just-pascal-case';
import justSnakeCase from 'just-snake-case';

import justIsEmpty from 'just-is-empty';
import justHas from 'just-has';

/**
 * Returns a camelCase-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *camelCase*-formatted string.
 *
 * Usage:
 * ```js
 * camelCase('New super Test-title') // => 'newSuperTestTitle'
 * camelCase(null) // => null
 * ```
 */
export const camelCase = (input) => justCamelCase(input ?? '');

/**
 * Returns a PascalCase-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *PascalCase*-formatted string.
 *
 * Usage:
 * ```js
 * pascalCase('New super Test-title') // => 'NewSuperTestTitle'
 * pascalCase(null) // => null
 * ```
 */
export const pascalCase = (input) => justPascalCase(input ?? '');

/**
 * Returns a snake_case-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *snake_case*-formatted string.
 *
 * Usage:
 * ```js
 * snakeCase('New super Test-title') // => 'NewSuperTestTitle'
 * snakeCase(null) // => null
 * ```
 */
export const snakeCase = (input) => justSnakeCase(input ?? '');

/**
 * Returns a kebab-case-formatted string.
 *
 * @param {string} input - String to convert.
 *
 * @access public
 *
 * @return {string} *kebab-case*-formatted string.
 *
 * Usage:
 * ```js
 * kebabCase('New super Test-title') // => 'new-super-test-title'
 * ```
 */
export const kebabCase = (input) => justKebabCase(input ?? '');

/**
 * Checks if value is an empty object or collection.
 *
 * @param {*} input - Value to check.
 *
 * @returns true if the object is empty, false otherwise.
 *
 * Usage:
 * ```js
 * isEmpty({}) // => true
 * isEmpty([]) // => true
 * isEmpty('') // => true
 * isEmpty({ a: 1 }) // => false
 * isEmpty([1, 2, 3]) // => false
 * ```
 */
export const isEmpty = (input) => justIsEmpty(input);

/**
 * Returns the string with its first character converted to lowercase.
 *
 * @param {string} string - String to convert.
 *
 * @return {string} string with its first character converted to lowercase.
 *
 * Usage:
 * ```js
 * lowerFirst('New super Test-title') // => 'new super Test-title'
 * ```
 */
export const lowerFirst = (string) => string ? string.charAt(0).toLowerCase() + string.slice(1) : '';

/**
 * Returns the string with its first character converted to uppercase.
 *
 * @param {string} string - String to convert.
 *
 * @return {string} string with its first character converted to uppercase.
 *
 * Usage:
 * ```js
 * upperFirst('new super Test-title') // => 'New super Test-title'
 * ```
 */
export const upperFirst = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

/**
 * Checks if `key` is a direct property of `object`. Key may be a path of a value separated by `.`
 *
 * @param {object} obj - Object to check.
 * @param {string} key - Key to check.
 *
 * @return {boolean} true if key is a direct property, false otherwise.
 *
 * Usage:
 * ```js
 * has({ a: 1 }, 'a') // => true
 * has({ a: 1 }, 'b') // => false
 * has({ a: { b: 2 } }, 'a.b') // => true
 * has({ a: { b: 3 } }, 'a.c') // => false
 * ```
 *
 */
export const has = (obj, key) => justHas(obj, key);

/*
 * Checks if value is a plain object, that is, an object created by the Object constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param {*} value - Value to check.
 * @returns {boolean} true if value is a plain object, false otherwise.
 *
 * Usage:
 * ```js
 * isPlainObject({ a: 2 }) // => true
 * isPlainObject('Lorem') // => false
 * isPlainObject([]) // => false
 * isPlainObject(new Boolean()) // => false
 * ```
 */
export const isPlainObject = (value) => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const proto = Object.getPrototypeOf(value);
	if (proto === null) {
		return true;
	}

	const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;

	return (
		typeof Ctor === 'function' &&
		Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value)
	);
};

// Source: https://youmightnotneed.com/lodash

/**
 * Checks if value is the language type of `Object`. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(’’))
 *
 * @param {*} input - Value to check.
 *
 * @returns {boolean} true if value is an array, false otherwise.
 *
 * Usage:
 * ```js
 * isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * ```
 */
export const isObject = (input) => input instanceof Object;

// Basic implementation, should cover most usual cases.
// Source: https://gist.github.com/jsjain/a2ba5d40f20e19f734a53c0aad937fbb

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * **Note**: works for simple types, arrays, and objects. Might not work for all the types the lodash version supports.
 *
 * @param {*} first First value to compare.
 * @param {*} second Second value to compare.
 *
 * @returns true if the values are equivalent, false otherwise.
 *
 * Usage:
 * ```js
 * isEqual({ a: 1 }, { a: 1 }) // => true
 * isEqual({ a: 1 }, { a: 2 }) // => false
 * isEqual({ a: 1 }, 'b') // => false
 * ```
 */
export const isEqual = (first, second) => {
	if (first === second) {
		return true;
	}

	if ((first === undefined || second === undefined || first === null || second === null)
		&& (first || second)) {
		return false;
	}

	const firstType = first?.constructor.name;
	const secondType = second?.constructor.name;

	if (firstType !== secondType) {
		return false;
	}

	if (firstType === 'Array') {
		if (first.length !== second.length) {
			return false;
		}

		let equal = true;

		for (let i = 0; i < first.length; i++) {
			if (!isEqual(first[i], second[i])) {
				equal = false;
				break;
			}
		}

		return equal;
	}

	if (firstType === 'Object') {
		let equal = true;
		const fKeys = Object.keys(first);
		const sKeys = Object.keys(second);

		if (fKeys.length !== sKeys.length) {
			return false;
		}

		for (let i = 0; i < fKeys.length; i++) {
			if (first[fKeys[i]] && second[fKeys[i]]) {
				if (first[fKeys[i]] === second[fKeys[i]]) {
					continue;
				}

				if (first[fKeys[i]] && (first[fKeys[i]].constructor.name === 'Array'
					|| first[fKeys[i]].constructor.name === 'Object')) {
					equal = isEqual(first[fKeys[i]], second[fKeys[i]]);
					if (!equal) {
						break;
					}
				} else if (first[fKeys[i]] !== second[fKeys[i]]) {
					equal = false;
					break;
				}
			} else if ((first[fKeys[i]] && !second[fKeys[i]]) || (!first[fKeys[i]] && second[fKeys[i]])) {
				equal = false;
				break;
			}
		}
		return equal;
	}

	return first === second;
};
