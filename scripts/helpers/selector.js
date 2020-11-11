import { checkAttr } from './check-attr';

/**
 * Retun BEM selector for html class and check all conditions from checkAttr method.
 *
 * @param string $block BEM Block selector.
 * @param string $element BEM Element selector.
 * @param string $key Key to check.
 * @param array  $attributes Array of attributes.
 * @param array  $manifest Array of default attributes from manifest.json.
 *
 * @return string
 */
export const selector = (block, element, key, attributes, manifest) => {
	const modifier = checkAttr(key, attributes, manifest);

	return modifier ? `${block}__${element}--${modifier}` : '';
};
