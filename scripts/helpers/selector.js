/**
 * Returns BEM selector for html class and check if Condition part is set.
 *
 * @param {boolean} condition - Check condition.
 * @param {string} block      - BEM Block selector.
 * @param {string} [element]  - BEM Element selector.
 * @param {string} [modifier] - BEM Modifier selector.
 *
 * @return string
 *
 * Usage:
 * ```js
 * selector(!(condition1 && condition2), 'foo-boo');
 *
 * selector(condition, 'foo', 'boo');
 *
 * selector(!condition, 'foo', 'boo', 'poo');
 * ```
 *
 * Equivalent:
 * ```js
 * !(condition1 && condition2) ? 'foo-boo' : '';
 *
 * condition ? 'foo__boo' : '';
 *
 * !(condition) ? 'foo__boo--poo' : '';
 * ```
 *
 * Output:
 * ```js
 * foo-boo
 *
 * foo__boo
 *
 * foo__boo--poo
 */
export const selector = (condition, block, element = '', modifier = '') => {
	let fullModifier = '';
	let fullElement = '';

	if (element) {
		fullElement = `__${element}`;
	}

	if (modifier) {
		fullModifier = `--${modifier}`;
	}

	return condition ? `${block}${fullElement}${fullModifier}` : '';
};
