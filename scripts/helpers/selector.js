/**
 * Returns BEM selector for html class and check if Condition part is set.
 *
 * @param {boolean} condition Check condition.
 * @param {string}  block BEM Block selector.
 * @param {string}  element BEM Element selector.
 * @param {string}  modifier BEM Modifier selector.
 *
 * @return string
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

