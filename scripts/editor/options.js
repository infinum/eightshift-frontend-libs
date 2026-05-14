import { getPaletteColors } from './colors';
import { getAttrKey } from './attributes';
import { lowerFirst, camelCase } from '@eightshift/ui-components/utilities';

const componentPrefixCache = new WeakMap();

const getComponentPrefix = (manifest) => {
	let cached = componentPrefixCache.get(manifest);

	if (cached === undefined) {
		cached = lowerFirst(camelCase(manifest.componentName));
		componentPrefixCache.set(manifest, cached);
	}

	return cached;
};

/**
 * Provides the ability to override component options from the parent block/component.
 * The components must have the same options name as attribute standard with componentName prefix.
 *
 * @param {string} key              - Key to check.
 * @param {array} attributes        - Array of attributes.
 * @param {object} manifest         - Components/blocks manifest.json
 * @param {boolean} [isColor=false] - If option is color return colors.
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * // General.
 * <SelectControl
 *   label={__('Type', 'eightshift-frontend-libs')}
 *   value={buttonType}
 *   options={getOption('buttonType', attributes, manifest)}
 *   onChange={(value) => setAttributes({ [getAttrKey('buttonType', attributes, manifest)]: value })}
 * />
 * ```
 *
 * // Color palette.
 * <ColorPaletteCustom
 *   label={__('Color', 'eightshift-frontend-libs')}
 *   value={buttonColor}
 *   options={getOption('buttonColor', attributes, manifest, true)}
 *   onChange={(value) => setAttributes({ [getAttrKey('buttonColor', attributes, manifest)]: value })}
 * />
 * ```
 */
export const getOption = (key, attributes, manifest, isColor = false) => {
	// Check if there is prefix in the attributes object.
	const options = attributes?.['options'] || {};

	// Get the correct key for the check in the attributes object.
	const newKey = getAttrKey(key, attributes, manifest);

	// Determine if manifest options key exists.
	const componentOptions = manifest?.options;

	// Bailout if componentOptions is missing — build name lazily only when about to throw.
	if (typeof componentOptions === 'undefined') {
		const name = 'blockName' in manifest ? manifest.blockName : manifest.componentName;

		throw Error(`It looks like you are missing options key in your ${name} manifest.`);
	}

	// Bailout if key is missing in manifest options or skip if option is color type.
	if (!Object.prototype.hasOwnProperty.call(componentOptions, key) && !isColor) {
		const name = 'blockName' in manifest ? manifest.blockName : manifest.componentName;

		throw Error(`It looks like you are missing ${key} options key in your ${name} manifest.`);
	}

	const componentOption = componentOptions[key];

	// Check the provided options overrides.
	if (Object.prototype.hasOwnProperty.call(options, newKey)) {
		const overrideValue = options[newKey];

		// If color type use color output.
		if (isColor) {
			return getOptionColors(overrideValue);
		}

		// Used for array of objects (selectControl options). If so check override by value key.
		if (typeof componentOption[0] === 'object') {
			return componentOption.filter((item) => overrideValue.includes(item.value));
		}

		// If array only user array value for check.
		return componentOption.filter((item) => overrideValue.includes(item));
	}

	// If color type use color output. Used for current component of no parent overrides are provided.
	if (isColor) {
		return getOptionColors(componentOption);
	}

	return componentOption;
};

/**
 * Use this hook to filter the global colors out of the component or block manifest.
 * _This function is deprecated._
 *
 * @deprecated Use `getOption` instead.
 *
 * Requires WP => 5.3
 *
 * @param {array} colors Array of colors to filter.
 *
 * @access public
 *
 * @return {object}
 *
 * Usage:
 * ```js
 * <ColorPaletteCustom
 *   label={__('Color', 'eightshift-frontend-libs')}
 *   value={buttonColor}
 *   options={getOptionColors(options.colors)}
 *   onChange={(value) => setAttributes({ [getAttrKey('buttonColor', attributes, manifest)]: value })}
 * />
 * ```
 */
export const getOptionColors = (colors) => {
	const coreColors = getPaletteColors();

	if (!Array.isArray(colors) || !colors.length) {
		return Object.values(coreColors);
	}

	return colors.map((colorName) => coreColors[colorName]);
};

/**
 * Combines two objects of options, one from current component and the other from the parent component.
 *
 * @param {array} [attributes={}] - Array of attributes.
 * @param {object} [manifest={}]  - Components/blocks manifest.json
 *
 * @access public
 *
 * @returns {object}
 *
 * Usage:
 * ```js
 * getOptions(attributes, manifest)
 * ```
 */
export const getOptions = (attributes = {}, manifest = {}) => {
	const optionsManifest = manifest?.['options'] ?? {};
	const optionsAttributes = attributes?.['options'] ?? {};

	const output = {};
	const prefix = typeof attributes['prefix'] === 'undefined' ? '' : attributes['prefix'];

	const componentPrefix = getComponentPrefix(manifest);

	for (const [key, value] of Object.entries(optionsManifest)) {
		const newKey = key.replace(componentPrefix, '');

		output[`${prefix}${newKey}`] = value;
	}

	return Object.assign(output, optionsAttributes);
};
