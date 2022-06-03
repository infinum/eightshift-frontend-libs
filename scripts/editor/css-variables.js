import React from 'react';
import _ from 'lodash';
import { subscribe, select, dispatch } from '@wordpress/data';
import { getAttrKey } from './attributes';
import { STORE_NAME } from './store';

/**
 * Get Global manifest.json and return global variables as CSS variables.
 *
 * @param {object} globalManifest - (Optional) Global variable data. - Deprecated.
 *
 * @access public
 *
 * @return {string|void}
 *
 * Global Manifest:
 * ```js
 * const manifestGlobal = {
 *   "globalVariables": {
 *     "maxCols": 12,
 *     "breakpoints": {
 *       "mobile": 479,
 *       "tablet": 1279,
 *       "desktop": 1919,
 *       "large": 1920
 *     },
 *     "containers": {
 *       "default": "1330px"
 *     },
 *     "gutters": {
 *       "none": "0",
 *       "default": "25px",
 *       "big": "50px"
 *     },
 *     "sectionSpacing": {
 *       "min":  -300,
 *       "max":  300,
 *       "step": 10
 *     },
 *     "sectionInSpacing": {
 *       "min":  0,
 *       "max":  300,
 *       "step": 10
 *     },
 *     "colors": [
 *       {
 *         "name": "Infinum",
 *         "slug": "infinum",
 *         "color": "#D8262C"
 *       },
 *       {
 *         "name": "Black",
 *         "slug": "black",
 *         "color": "#111111"
 *       }
 *     ]
 *   }
 * };
 * ```
 *
 * Usage:
 * ```js
 * import globalSettings from './../../manifest.json';
 *
 * outputCssVariablesGlobal(globalSettings);
 * ```
 *
 * Output:
 * ```js
 * <style>
 *   :root {
 *     --global-max-cols: 12;
 *     --global-breakpoints-mobile: 479;
 *     --global-breakpoints-tablet: 1279;
 *     --global-breakpoints-desktop: 1919;
 *     --global-breakpoints-large: 1920;
 *     --global-containers-default: 1330px;
 *     --global-gutters-none: 0;
 *     --global-gutters-default: 25px;
 *     --global-gutters-big: 50px;
 *     --global-section-spacing-min: -300;
 *     --global-section-spacing-max: 300;
 *     --global-section-spacing-step: 10;
 *     --global-section-in-spacing-min: 0;
 *     --global-section-in-spacing-max: 300;
 *     --global-section-in-spacing-step: 10;
 *     --global-colors-infinum: #D8262C;
 *     --global-colors-black: #111111;
 *     --global-colors-white: #FFFFFF;
 *   }
 * </style>
 * ```
 */
export const outputCssVariablesGlobal = (globalManifest = {}) => { // eslint-disable-line no-unused-vars
	let output = '';

	for (const [itemKey, itemValue] of Object.entries(select(STORE_NAME).getSettingsGlobalVariables())) {
		const itemKeyInner = _.kebabCase(itemKey);

		if (_.isObject(itemValue)) {
			output += globalInner(itemValue, itemKeyInner);
		} else {
			output += `--global-${itemKeyInner}: ${itemValue};\n`;
		}
	}

	// Optimize if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output.replace('\n', '');
	}

	// Prepare output.
	const finalOutput = `<style id="${select(STORE_NAME).getConfigOutputCssSelectorName()}-global">:root {${output}}</style>`;

	// Set breakpoints cache for optimized load time.
	setBreakpointsCacheData();

	// If using inline css variables output them.
	if (select(STORE_NAME).getConfigOutputCssGlobally()) {
		outputCssVariablesInline();
	}

	// Output style tag.
	return document.head.insertAdjacentHTML('afterbegin', finalOutput);
};

/**
 * Get component/block options and process them in CSS variables.
 *
 * @param {array} attributes      - Built attributes.
 * @param {array} manifest        - Component/block manifest data.
 * @param {string} unique         - Unique key.
 * @param {object} globalManifest - (Optional) Global variable data.
 * @param {string} customSelector - Output custom selector to use as a style prefix.
 *
 * @access public
 *
 * @return {string}
 *
 * Usage:
 * ```js
 * import React, { useMemo } from 'react';
 *
 * const unique = useMemo(() => getUnique(), []);
 *
 * outputCssVariables(attributes, manifest, unique);
 * ```
 */
export const outputCssVariables = (attributes, manifest, unique, globalManifest = {}, customSelector = '') => { // eslint-disable-line no-unused-vars

	const breakpoints = select(STORE_NAME).getSettingsGlobalVariablesBreakpoints();

	// Define variables from manifest.
	const variables = manifest?.variables;
	const variablesEditor = manifest?.variablesEditor;
	const responsiveAttributes = manifest?.responsiveAttributes;

	// Sort breakpoints in correct order.
	const sortedBreakpoints = Object.entries(breakpoints)
		.sort((a, b) => {
			return a[1] - b[1]; // Sort from the smallest to the largest breakpoint.
		});

	const defaultBreakpoints = {
		min: sortedBreakpoints?.[0]?.[0] || '',
		max: sortedBreakpoints?.[sortedBreakpoints.length - 1]?.[0] || '',
	};

	// Get the initial data array.
	const data = prepareVariableData(sortedBreakpoints);

	if (typeof variables !== 'undefined') {
		// Iterate each responsiveAttribute from responsiveAttributes that appears in variables field.
		if (typeof responsiveAttributes !== 'undefined') {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variables), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variables field.
		setVariablesToBreakpoints(attributes, variables, data, manifest, defaultBreakpoints);
	}

	// Iterate each responsiveAttribute from responsiveAttributes that appears in variablesEditor field.
	if (typeof variablesEditor !== 'undefined') {
		if (typeof responsiveAttributes !== 'undefined') {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variablesEditor), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variablesEditor field.
		setVariablesToBreakpoints(attributes, variablesEditor, data, manifest, defaultBreakpoints);
	}

	// Check if component or block.
	let name = manifest.componentClass ?? attributes.blockClass;

	// Switch selector name.
	if (customSelector !== '') {
		name = customSelector;
	}

	// If default output just echo.
	if (!select(STORE_NAME).getConfigOutputCssGlobally()) {
		return getCssVariablesTypeDefault(name, data, manifest, unique);
	}

	// Find if style exists in the store.
	const existsIndex = select(STORE_NAME).getStyles().findIndex((item) => item?.name === name && item?.unique === unique);

	// Find blockClientId from the attributes.
	const blockClientId = attributes?.blockClientId;

	// Don't do anything if blockClientId is missing.
	if (typeof blockClientId !== 'undefined') {
		if (existsIndex !== -1) {
			// Update existing styles.
			dispatch(STORE_NAME).setStyleByIndex(getCssVariablesTypeInline(name, data, manifest, unique, blockClientId), existsIndex);
		} else {
			// Add new styles.
			dispatch(STORE_NAME).setStyle(getCssVariablesTypeInline(name, data, manifest, unique, blockClientId));
		}
	}

	return null;
};

/**
 * Convert hex color into RGB values.
 *
 * @param {string} input - Input hex color (either 3 or 6 characters).
 *
 * @access public
 *
 * @return {string}
 */
 export const hexToRgb = (input) => {
	let r = 0, g = 0, b = 0;
	const hex = input.replace('#', '').trim();

	if (hex.length === 3) {
		const [r1, g1, b1] = hex;
		r = `0x${r1}${r1}`;
		g = `0x${g1}${g1}`;
		b = `0x${b1}${b1}`;
	} else if (hex.length === 6) {
		const [r1, r2, g1, g2, b1, b2] = hex;
		r = `0x${r1}${r2}`;
		g = `0x${g1}${g2}`;
		b = `0x${b1}${b2}`;
	}

	r = Number(r);
	g = Number(g);
	b = Number(b);

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return '0 0 0';
	}

	return `${r} ${g} ${b}`;
};

/**
 * Returns a unique ID, generally used with CSS variable generation.
 *
 * @access public
 *
 * @return {string}
 *
 * Usage:
 * ```js
 * getUnique();
 * ```
 *
 * Output:
 * ```js
 * 891273981374b98127419287
 * ```
 */
export const getUnique = () => {
	return require('crypto').randomBytes(16).toString('hex');
};

// ------------------------------------------------------------------------------
// PRIVATE METHODS
// ------------------------------------------------------------------------------

// Internal variable for storing caches breakpoint data.
let breakpointsPreparedVariableDataCache = [];

/**
 * Output CSS variables as one inline style tag.
 *
 * @access private
 *
 * @returns {void}
 */
export const outputCssVariablesInline = () => {
	// Subscribe to changes in state.
	subscribe(
		// Add some debounce for optimizations.
		_.debounce(() => {
			// Check if style has changed.
			const hasStylesUpdated = select(STORE_NAME).hasStylesUpdated();

			if (hasStylesUpdated) {
				// Output inline style tag from store data.
				outputCssVariablesCombinedInner(select(STORE_NAME).getStyles());
			}
		}, 50)
	);

	// Find current tree with all inner blocks and all reusable blocks.
	let currentStateBlocks = select('core/block-editor').__unstableGetClientIdsTree(); // eslint-disable-line no-underscore-dangle

	// Subscribe to changes in state.
	subscribe(() => {
		// Find updated state of blocks after render.
		const newStateBlocks = select('core/block-editor').__unstableGetClientIdsTree(); // eslint-disable-line no-underscore-dangle

		// Make changes only if blocks changed.
		if (newStateBlocks !== currentStateBlocks) {
			// Make all current and next blocks flat for easy checking.
			const next = getAllBlocksFlat(newStateBlocks);
			const previous = getAllBlocksFlat(currentStateBlocks);

			// Find deleted blocks.
			const deleted = getDifference(previous, next);

			// If blocks are deleted remove them from the style store.
			if (deleted) {
				// Loop all styles.
				select(STORE_NAME).getStyles().forEach((item, index) => {
					// Find index of deleted item by clientId and remove it from the store.
					deleted.forEach((element) => {
						if (element.clientId === item.blockClientId) {
							dispatch(STORE_NAME).unsetStyleByIndex(index);
						}
					});
				});
			}
		}

		// Update current state with the new one.
		currentStateBlocks = newStateBlocks;
	});
};

/**
 * Find difference in two arrays with multiple nesting levels.
 *
 * @param {array} array1 Array to look.
 * @param {array} array2 Array to check.
 *
 * @access private
 *
 * @returns {array}
 */
export const getDifference = (array1, array2) => {
	return array1.filter(object1 => {
		return !array2.some(object2 => {
			return object1.clientId === object2.clientId;
		});
	});
};

/**
 * Return CSS variables in default type. On the place where it was called.
 *
 * @param {string} name - Output css selector name.
 * @param {array} data - Data prepared for checking.
 * @param {array} manifest - Component/block manifest data.
 * @param {string} unique - Unique key.
 *
 * @access private
 *
 * @returns {string}
 */
export const getCssVariablesTypeDefault = (name, data, manifest, unique) => {
	let output = '';

	let uniqueSelector = `[data-id='${unique}']`;

	if (!unique) {
		uniqueSelector = '';
	}

	// Loop data and provide correct selectors from data array.
	for(const {type, value, variable} of data) {
		// If breakpoint value is 0 then don't wrap the media query around it.
		if (variable.length === 0) {
			continue;
		}

		if (value === 0) {
			// No breakpoint outputted.
			output += `\n .${name}${uniqueSelector}{\n${variable.join('\n')}\n}`;
		} else {
			// With breakpoint.
			output += `\n @media (${type}-width: ${value}px) {\n.${name}${uniqueSelector}{\n${variable.join('\n')}\n}\n}`;
		}
	}

	// Output manual output from the array of variables.
	let manual = '';
	const variablesCustom = manifest?.variablesCustom;

	if (typeof variablesCustom !== 'undefined') {
		manual = variablesCustom.join(';\n');
	}

	// Output manual editor output from the array of variables.
	let manualEditor = '';
	const variablesCustomEditor = manifest?.variablesCustomEditor;

	if (typeof variablesCustomEditor !== 'undefined') {
		manualEditor = variablesCustomEditor.join(';\n');
	}

	// Process CSS variables.
	output = processCssVarsRemBaseSize(output);
	manual = processCssVarsRemBaseSize(manual);
	manualEditor = processCssVarsRemBaseSize(manualEditor);

	// Prepare final output for testing.
	const fullOutput = `
		${output}
		${manual}
		${manualEditor}
	`;

	// Check if final output is empty and return if empty string if it is.
	if (_.isEmpty(fullOutput.trim())) {
		return '';
	}

	// Prepare output for manual variables.
	const finalManualOutput = manual || manualEditor ? `.${name}${uniqueSelector}{ ${manual} ${manualEditor}}` : '';

	// Implement some optimizations if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output.replace('\n', '');
		finalManualOutput.replace('\n', '');
	}

	// Output the style for CSS variables.
	return <style dangerouslySetInnerHTML={{__html: `${output} ${finalManualOutput}`}}></style>;
};

/**
 * Get css variables in inline type. In one place in dom.
 *
 * @param {string} name - Output css selector name.
 * @param {array} data - Data prepared for checking.
 * @param {array} manifest - Component/block manifest data.
 * @param {string} unique - Unique key.
 * @param {string} blockClientId - blockClientId key from attributes, corresponds to the original clientId from core.
 *
 * @access private
 *
 * @returns {array}
 */
export const getCssVariablesTypeInline = (name, data, manifest, unique, blockClientId) => {
	// Prepare output style object.
	const styles = {
		name,
		unique,
		blockClientId,
		variables: [],
	};

	// Loop data and provide correct selectors from data array.
	for (const {type, value, variable} of data) {
		// If breakpoint value is 0 then don't wrap the media query around it.
		if (variable.length === 0) {
			continue;
		}

		// Push data to local state.
		styles.variables.push({
			type,
			variable,
			value,
		});
	}

	// Output manual output from the array of variables.
	const variablesCustom = manifest?.variablesCustom;
	if (typeof variablesCustom !== 'undefined') {
		styles.variables.push({
			type: 'min',
			variable: variablesCustom,
			value: 0
		});
	}

	// Output manual editor output from the array of variables.
	const variablesCustomEditor = manifest?.variablesCustomEditor;
	if (typeof variablesCustomEditor !== 'undefined') {
		styles.variables.push({
			type: 'min',
			variable: variablesCustomEditor,
			value: 0
		});
	}

	return styles;
};

/**
 * Process and return global CSS variables based on the type.
 *
 * @param {array} itemValues - Values to check.
 * @param {string} itemKey   - Item key to check.
 *
 * @access private
 *
 * @return {string}
 */
export const globalInner = (itemValues, itemKey) => {
	let output = '';

	for (const [key, value] of Object.entries(itemValues)) {
		const innerKey = _.kebabCase(key);
		const itemInnerKey = _.kebabCase(itemKey);

		const {
			slug,
			color,
			gradient,
		} = value;

		switch (itemInnerKey) {
			case 'colors':
				if (typeof slug === 'undefined' || typeof color === 'undefined') {
					break;
				}

				output += `--global-${itemInnerKey}-${value.slug}: ${value.color};\n`;
				output += `--global-${itemInnerKey}-${value.slug}-values: ${hexToRgb(value.color)};\n`;
				break;
			case 'gradients':
				if ( typeof slug === 'undefined' || typeof gradient === 'undefined') {
					break;
				}
				output += `--global-${itemInnerKey}-${value.slug}: ${value.gradient};\n`;
				break;
			case 'font-sizes':
				if ( typeof slug === 'undefined') {
					break;
				}
				output += `--global-${itemInnerKey}-${value.slug}: ${value.slug};\n`;
				break;
			default:
				output += `--global-${itemInnerKey}-${innerKey}: ${value};\n`;
				break;
		}
	}

	return output;
};

/**
 * Sets up a breakpoint value to responsive attribute objects from responsiveAttribute object.
 *
 * @param {array}  attributeVariables  - Array of attribute variables object.
 * @param {string} breakpointName    	 - Breakpoint name from responsiveAttribute's breakpoint in block's/component's manifest.
 * @param {number} breakpointIndex   	 - Index of responsiveAttribute's breakpoint in manifest.
 * @param {number} numberOfBreakpoints - Number of responsiveAttribute breakpoints in block's/component's manifest.
 *
 * @return {array}
 */
export const setBreakpointResponsiveVariables = (attributeVariables, breakpointName, breakpointIndex, numberOfBreakpoints) => {
	return attributeVariables.map((attributeVariablesObject) => {

		// Calculate default breakpoint index based on order of the breakpoint, inverse property and number of properties in responsiveAttributeObject.
		const defaultBreakpointIndex = attributeVariablesObject.inverse ? 0 : (numberOfBreakpoints - 1);

		// Expanding an object with an additional breakpoint property.
		return {
			...attributeVariablesObject,
			breakpoint: breakpointIndex === defaultBreakpointIndex ? 'default' : breakpointName,
		};
	});
};

/**
 * Iterating through variables matching the keys from responsiveAttributes and translating it to responsive attributes names.
 *
 * @param {object} responsiveAttributes - Responsive attributes that are read from component's/block's manifest.
 * @param {object} variables            - Object containing objects with component's/block's attribute variables that are read from manifest.
 *
 * @return {object} Object prepared for setting all the variables to its breakpoints.
 */
export const setupResponsiveVariables = (responsiveAttributes, variables) => {
	// Iterate through responsive attributes.
	return Object.entries(responsiveAttributes)
		.reduce((responsiveAttributesVariables, [responsiveAttributeName, responsiveAttributeObject]) => {

			// If responsive attribute doesn't exist in variables object, skip it.
			if (!responsiveAttributeName || _.isEmpty(variables[responsiveAttributeName])) {
				return responsiveAttributesVariables;
			}

			// Used for determination of default breakpoint.
			const numberOfBreakpoints = Object.entries(responsiveAttributeObject).length;

			// Iterate each responsive attribute object as breakpoint name is the key of the object,
			// and value represents the name of the responsive variable.
			const responsiveAttributeVariables = Object.entries(responsiveAttributeObject)
				.reduce((responsiveAttribute, [breakpointName, breakpointVariableName], breakpointIndex) => {
					let breakpointVariables = {};

					if (Array.isArray(variables[responsiveAttributeName])) { // Array represents direct value(default or value).
						breakpointVariables = setBreakpointResponsiveVariables(
							variables[responsiveAttributeName],
							breakpointName,
							breakpointIndex,
							numberOfBreakpoints
						);
						return {
							...responsiveAttribute,
							[breakpointVariableName]: breakpointVariables,
						};
					}

					// Object treatment goes depending on a value inserted(multiple choice, boolean or similar).
					// Iterate options/multiple choices/boolean...
					breakpointVariables = Object.entries(variables[responsiveAttributeName])
						.reduce((acc, [attributeValue, attributeObject]) => {
							return {
								...acc,
								[attributeValue]: setBreakpointResponsiveVariables(attributeObject, breakpointName, breakpointIndex, numberOfBreakpoints),
							};
						}, {});

					// Collect all the values from one responsive attribute to one object.
					return {
						...responsiveAttribute,
						[breakpointVariableName]: breakpointVariables,
					};
				}, {});

			// Merge multiple responsive attributes to one object.
			return {...responsiveAttributesVariables, ...responsiveAttributeVariables};
		}, {});
};

/**
 * Setting defined variables to each breakpoint.
 *
 * @param {object} attributes         - Attributes fetched from manifest.
 * @param {object} variables          - Variables fetched from manifest.
 * @param {object} data               - Preset objects separated in breakpoints.
 * @param {array} manifest            - Component/block manifest data.
 * @param {object} defaultBreakpoints - Default breakpoints for mobile/desktop first.
 *
 * @access private
 *
 * @return {object} Filled object with variables data separated in breakpoints.
 */
export const setVariablesToBreakpoints = (attributes, variables, data, manifest, defaultBreakpoints) => {
	// Iterate each variable.
	for (const [variableName, variableValue] of Object.entries(variables)) {

		// Constant for attributes set value (in db or default).
		const attributeValue = attributes[getAttrKey(variableName, attributes, manifest)];

		// Set internal breakpoints variable.
		const internalBreakpoints = Array.isArray(variableValue) ? variableValue : (variableValue[attributeValue] ?? []);

		// Iterate variable array to check breakpoints.
		internalBreakpoints.forEach((breakpointItem) => {

			// Define variables from breakpointItem.
			const {
				breakpoint: itemBreakpoint, // Put in temporary variable before checking the type of breakpointItem.
				inverse = false, // If inverse is not set use mobile first.
				variable = [],
			} = breakpointItem;

			// Check if we are using mobile or desktop first. Mobile first is the default.
			const type = inverse ? 'max' : 'min';

			// If breakpoint is not set or has default breakpoint value use default name.
			const breakpoint = (!itemBreakpoint || itemBreakpoint === defaultBreakpoints[type]) ? 'default' : itemBreakpoint;

			// Iterate each data array to find the correct breakpoint.
			data.some((item, index) => {

				// Check if breakpoint and type match.
				if (item.name === breakpoint && item.type === type) {

					// Merge data variables with the new variables array.
					data[index].variable = item.variable.concat(variablesInner(variable, attributeValue));

					// Exit.
					return true;
				}

				return false;
			});
		});
	}
	return data;
};

/**
 * Create initial array of data to be able to populate later.
 *
 * @param {object} globalBreakpoints - Global breakpoints from global manifest to set the correct output.
 *
 * @access private
 *
 * @return {array}
 */
export const prepareVariableData = (globalBreakpoints) => {

	// Define the min and max arrays.
	const min = [];
	const max = [];
	let minBreakpointValue = 0;

	// Loop the global breakpoints and populate the data.
	Object.values(globalBreakpoints).forEach(([item, value]) => {

		// Initial inner object.
		const itemObject = {
			name: item,
			value: value,
			variable: [],
		};

		// Inner object for min values.
		const itemObjectMin = {
			...itemObject,
			type: 'min',
			value: minBreakpointValue,
		};

		// Inner object for max values.
		const itemObjectMax = {
			...itemObject,
			type: 'max',
		};

		// Transfer value to a larger breakpoint.
		minBreakpointValue = value;

		// Push both min and max to the defined arrays.
		min.push(itemObjectMin);
		max.push(itemObjectMax);
	});

	// Pop largest breakpoint out of min array.
	min.shift();

	// Add default object to the top of the array.
	min.unshift({
		type: 'min',
		name: 'default',
		value: 0,
		variable: [],
	});

	// Reverse order of max array.
	max.reverse();

	// Throwout the largest.
	max.shift();

	// Add default object to the top of the array.
	max.unshift({
		type: 'max',
		name: 'default',
		value: 0,
		variable: [],
	});

	// Merge both arrays.
	return min.concat(max);
};

/**
 * Internal helper to loop CSS Variables from array.
 *
 * @param {array} variables      - Array of variables of CSS variables.
 * @param {mixed} attributeValue - Original attribute value used in magic variable.
 *
 * @access private
 *
 * @returns {array}
 */
export const variablesInner = (variables, attributeValue) => {
	let output = [];

	// Bailout if provided variables is not an object or if attribute value is empty or undefined, used to unset/reset value..
	if (typeof attributeValue === 'undefined' || !_.isPlainObject(variables)) {
		return output;
	}

	// Iterate each attribute and make corrections.
	for (const [variableKey, variableValue] of Object.entries(variables)) {
		let value = variableValue;

		// If value contains magic variable swap that variable with original attribute value.
		if (variableValue.includes('%value%')) {
			value = variableValue.replace('%value%', attributeValue);
		}

		// Bailout if value is empty or undefined.
		if (value === 'undefined' || _.isEmpty(value)) {
			continue;
		}

		// Output the custom CSS variable by adding the attribute key + custom object key.
		output.push(`--${_.kebabCase(variableKey)}: ${value};`);
	}

	return output;
};

/**
 * Set breakpoints cache for optimized load time.
 *
 * @access private
 *
 * @returns {void}
 */
export const setBreakpointsCacheData = () => {
	// Prepare breakpoints.
	const breakpoints = select(STORE_NAME).getSettingsGlobalVariablesBreakpoints();

	const breakpointsCache = Object.entries(breakpoints).sort((a, b) => {
		return a[1] - b[1]; // Sort from the smallest to the largest breakpoint.
	});

	// Prepare breakpoints data to output combined css variables.
	const breakpointsMin = breakpointsCache.map((item) => {
		return {
			type: 'min',
			value: item[1],
		};
	});
	breakpointsMin.unshift({
		type: 'min',
		value: 0,
	});

	const breakpointsMax = breakpointsCache.reverse().map((item) => {
		return {
			type: 'max',
			value: item[1],
		};
	});
	breakpointsMax.unshift({
		type: 'max',
		value: 0,
	});

	breakpointsPreparedVariableDataCache = breakpointsMin.concat(breakpointsMax);
};

/**
 * Get all blacks inner-blocks recursively in one flat array.
 *
 * @param {array} blocks - Array of blocks.
 *
 * @access private
 *
 * @returns {array}
 */
export const getAllBlocksFlat = (blocks) => {
	let output = [];

	// Loop all blocks.
	blocks.forEach((block) => {
		const {
			innerBlocks,
		} = block;

		// Internal output.
		let innerOutput = [];

		// Add current block to the state.
		output.push(block);

		// If inner blocks are listed do recursive add.
		if (innerBlocks.length > 0) {
			innerOutput = getAllBlocksFlat(innerBlocks);
		}

		// Output all.
		output = output.concat(innerOutput);
	});

	return output;
};

/**
 * Output css variables as a one inline style tag - inner.
 *
 * @param {string} styles - CSS variables to process.
 *
 * @access private
 *
 * @returns {string}
 */
const processCssVarsRemBaseSize = (styles) => {
	const remRegex = /([0-9.-]+rem)/g;
	const remReplacement = 'calc($1 * var(--base-font-size, 1))';

	return select(STORE_NAME).getConfigUseRemBaseSize() ? styles.replaceAll(remRegex, remReplacement) : styles;
};

/**
 * Output css variables as a one inline style tag - inner.
 *
 * @access private
 *
 * @returns {string}
 */
export const outputCssVariablesCombinedInner = (styles) => {
	const breakpoints = [];

	// Loop styles.
	for (const {name, unique, variables} of styles) {
		// Bailout if variables are missing.
		if (variables.length === 0) {
			continue;
		}

		let uniqueSelector = `[data-id='${unique}']`;

		if (!unique) {
			uniqueSelector = '';
		}

		// Loop inner variables.
		for (const {type, value, variable} of variables) {
			// Bailout if variable is missing.
			if (variable.length === 0) {
				continue;
			}

			// Set breakpoint to empty if it is missing initially.
			if (typeof breakpoints[`${type}---${value}`] === 'undefined') {
				breakpoints[`${type}---${value}`] = '';
			}

			// Populate breakpoints output.
			breakpoints[`${type}---${value}`] += `\n.${name}${uniqueSelector}{\n${variable.join('\n')}\n} `;
		}
	}

	// Prepare final output.
	let output = '';

	// Loop all breakpoints prepared for output.
	breakpointsPreparedVariableDataCache.forEach(({type, value}) => {
		const breakpointValue = breakpoints[`${type}---${value}`] ?? '';

		// Bailout if breakpoint is missing.
		if (breakpointValue === '') {
			return;
		}

		// Wrap media queries with correct selectors.
		if (value === 0) {
			output += `${breakpointValue}\n`;
		} else {
			output += `\n@media (${type}-width:${value}px){${breakpointValue}}\n `;
		}
	});

	// Do optimizations if necessary.
	if (select(STORE_NAME).getConfigOutputCssOptimize()) {
		output = output.replace(/\n|\r/g, '');
	}

	// Add additional style from config settings.
	const additionalStyles = select(STORE_NAME).getConfigOutputCssGloballyAdditionalStyles();
	let additionalStylesOutput = '';
	if (typeof additionalStyles !== 'undefined') {
		additionalStylesOutput = additionalStyles.join(';\n');
	}

	// Get style id name from store.
	const selector = select(STORE_NAME).getConfigOutputCssSelectorName();

	// Detect if style tag is present in dom.
	const styleTag = document.getElementById(selector);

	// Process styles.
	output = processCssVarsRemBaseSize(output);
	additionalStylesOutput = processCssVarsRemBaseSize(additionalStylesOutput);
	if (!styleTag) {
		document.body.insertAdjacentHTML('beforeend', `<style id="${selector}">${output} ${additionalStylesOutput}</style>`);
	} else {
		styleTag.innerHTML = `${output} ${additionalStylesOutput}`;
	}

	// Reset state to original.
	dispatch(STORE_NAME).unsetStylesUpdated();
};
