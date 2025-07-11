import { clsx } from '@eightshift/ui-components/utilities';

/**
 * Returns BEM selector for html class and check if Condition part is set.
 *
 * @param {boolean} condition - Check condition.
 * @param {string} block      - BEM Block selector.
 * @param {string} [element]  - BEM Element selector.
 * @param {string} [modifier] - BEM Modifier selector.
 *
 * @access public
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

/**
 * Create responsive selectors used for responsive attributes.
 *
 * @param {array}   items              - Array of breakpoints.
 * @param {string}  selector           - Selector for this breakpoint.
 * @param {string}  parent             - Parent block selector.
 * @param {boolean} [useModifier=true] - If false you can use this selector for visibility.
 *
 * @access public
 *
 * @return string
 *
 * Usage:
 * ```js
 * responsiveSelectors(attributes.width, 'width', blockClass);
 * ```
 *
 * Output:
 * ```
 * block-column__width-large--4
 * ```
 */
export const responsiveSelectors = (items, selector, parent, useModifier = true) => {
	const output = [];

	for (const itemKey in items) {
		if (Object.prototype.hasOwnProperty.call(items, itemKey)) {
			if (items[itemKey] === '' || items[itemKey] === false || typeof items[itemKey] === 'undefined') {
				continue;
			}

			if (useModifier) {
				output.push(`${parent}__${selector}-${itemKey}--${items[itemKey]}`);
			} else {
				output.push(`${parent}__${selector}-${itemKey}`);
			}
		}
	}

	return clsx(output);
};

/**
 * Returns a BEM selector based on the provided block, element, and modifier classes.
 *
 * @param {string} block - The block class name.
 * @param {string?} [element] - The element class name (optional).
 * @param {string?} [modifier] - The modifier class name (optional).
 *
 * @access public
 * @since 9.3.0
 *
 * @returns {string|null} The BEM selector, or null if `block` is missing.
 */
export const bem = (block, element, modifier) => {
	if (block?.length < 1) {
		return null;
	}

	let output = block;

	if (element?.length > 0) {
		output += `__${element}`;
	}

	if (modifier?.length > 0) {
		output += `--${modifier}`;
	}

	return output;
};
