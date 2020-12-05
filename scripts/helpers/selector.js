import { checkAttr } from './check-attr';

/**
 * Retun BEM selector for html class and check if Block part is set.
 *
 * @param string block BEM Block selector.
 * @param string element BEM Element selector.
 * @param string modifier BEM Modifier selector.
 *
 * @return string
 */
export const selectorBlock = (block, element = '', modifier = '') => {
	let fullModifier = '';
	let fullElement = '';

	if (element) {
		fullElement = `__${element}`;
	}

	if (modifier) {
		fullModifier = `--${modifier}`;
	}

	return block ? `${block}${fullElement}${fullModifier}` : '';
};

/**
 * Retun BEM selector for html class and check if Element part is set.
 *
 * @param string block BEM Block selector.
 * @param string element BEM Element selector.
 * @param string modifier BEM Modifier selector.
 *
 * @return string
 */
export const selectorElement = (block, element, modifier = '') => {
	let fullModifier = '';

	if (modifier) {
		fullModifier = `--${modifier}`;
	}

	return element ? `${block}__${element}${fullModifier}` : '';
};

/**
 * Retun BEM selector for html class and check if Modifier part is set.
 *
 * @param string block BEM Block selector.
 * @param string element BEM Element selector.
 * @param string modifier BEM Modifier selector.
 *
 * @return string
 */
export const selectorModifier = (block, element, modifier) => {
	return modifier ? `${block}__${element}--${modifier}` : '';
};

/**
 * Retun BEM selector for html class and check all conditions from checkAttr method.
 *
 * @param string block BEM Block selector.
 * @param string element BEM Element selector.
 * @param string key Key to check.
 * @param array  attributes Array of attributes.
 * @param array  manifest Array of default attributes from manifest.json.
 *
 * @return string
 */
export const selector = (block, element, key, attributes, manifest) => {
	const modifier = checkAttr(key, attributes, manifest);
	return selectorModifier(block, element, modifier);
};



/**
 * Retun BEM selector for html class and check if Custom condition is set.
 *
 * @param bool   condition Check condition.
 * @param string block BEM Block selector.
 * @param string element BEM Element selector.
 * @param string modifier BEM Modifier selector.
 *
 * @return string
 */
export const selectorCustom = (condition, block, element = '', modifier = '') => {
	return condition ? selectorBlock(block, element, modifier) : '';
};
