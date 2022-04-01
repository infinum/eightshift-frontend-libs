import _ from 'lodash';
import { getPaletteColors } from "./colors";
import { getAttrKey } from '../helpers/check-attr';

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

	// Determine if this is component or block and provide the name, not used for anything important but only to output the error msg.
	const name = Object.prototype.hasOwnProperty.call(manifest, 'blockName') ? manifest.blockName : manifest.componentName;

	// Bailout if componentOptions is missing.
	if (typeof componentOptions === 'undefined') {
		throw Error(`It looks like you are missing options key in your ${name} manifest.`);
	}

	// Bailout if key is missing in manifest options or skip if option is color type.
	if (!Object.prototype.hasOwnProperty.call(manifest.options, key) && !isColor) {
		throw Error(`It looks like you are missing ${key} options key in your ${name} manifest.`);
	}

	// Check the provided options overrides.
	if (Object.prototype.hasOwnProperty.call(options, newKey)) {

		// If color type use color output.
		if (isColor) {
			return getOptionColors(options[newKey]);
		}

		// Used for array of objects (selectControl options). If so check override by value key.
		if (typeof componentOptions[key][0] === 'object') {
			return componentOptions[key].filter((item) => options[newKey].includes((item.value)));
		}

		// If array only user array value for check.
		return manifest.options[key].filter((item) => options[newKey].includes(item));
	}

	// If color type use color output. Used for current component of no parent overrides are provided.
	if (isColor) {
		return getOptionColors(componentOptions[key]);
	}

	// If you have default name for component.
	return manifest.options[key];
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
	const componentName = manifest['componentName'];
	
	const output = {};
	const prefix = (typeof attributes['prefix'] === 'undefined') ? '' : attributes['prefix'];

	for (const [key, value] of Object.entries(optionsManifest)) {
		const newKey = key.replace(`${_.lowerFirst(_.camelCase(componentName))}`, '');

		output[`${prefix}${newKey}`] = value;
	}

	return Object.assign(output, optionsAttributes);
};
