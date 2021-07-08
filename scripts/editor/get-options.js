import { getPaletteColors } from "./get-palette-colors";
import _ from 'lodash';

/**
 * Provides ability to override component options from the parent block/component
 * The components must have the same options name as attribute standard with componentName prefix.
 *
 * @param {string} key              - Key to check.
 * @param {array} attributes        - Array of attributes.
 * @param {object} manifest         - Components/blocks manifest.json
 * @param {boolean} [isColor=false] - If option is color return colors.
 * 
 * @returns {object}
 */
export const getOption = (key, attributes, manifest, isColor = false) => {

	// Check if there is prefix in the attributes object.
	const prefix = attributes?.prefix;
	const options = attributes?.['options'] || {};
	let newKey = key;

	// If there is no prefix return the key as it was.
	// If there is a prefix, remove the attribute component name prefix and replace it with the new prefix.
	if (typeof prefix !== 'undefined') {
		// No need to test if this is block or component because on top level block there is no prefix.
		newKey = key.replace(_.camelCase(manifest.componentName), prefix);
	}

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
}

/**
 * Use this hook to filter the global colors out of the component or block manifest
 *
 * Requires WP => 5.3
 *
 * @param {array} colors Array of colors to filter.
 *
 * @return object
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
 * @returns {object}
 */
export const getOptions = (attributes = {}, manifest = {}) => {
	const optionsManifest = manifest?.['options'] || {};
	const optionsAttributes = attributes?.['options'] || {};

	return Object.assign(optionsManifest, optionsAttributes);
}
