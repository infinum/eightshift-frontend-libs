import _ from 'lodash';
import { getAttrKey } from '../helpers/check-attr';
import {
	getSettingsConfigOutputCssVariablesGlobally,
	getSettingsStyles,
	getSettingsGlobalCssVariables,
} from './get-manifest-details';

/**
 * Get Global manifest.json and return global variables as CSS variables.
 *
 * @param {object} globalManifest - (Optional) Global variable data.
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
export const outputCssVariablesGlobal = (globalManifest = {}) => {

	let output = '';
	let globalVariables = getSettingsGlobalCssVariables();

	// Read from global cache data if no item is provided using props.
	if (!_.isEmpty(globalManifest)) {
		globalVariables = globalManifest?.globalVariables;
	}

	if (typeof globalVariables === 'undefined') {
		throw Error(`It looks like you are missing variables in the provided globalManifest object. Please check if you data has globalVariables key.`);
	}

	for (const [itemKey, itemValue] of Object.entries(globalVariables)) {
		const itemKeyInner = _.kebabCase(itemKey);

		if (_.isObject(itemValue)) {
			output += globalInner(itemValue, itemKeyInner);
		} else {
			output += `--global-${itemKeyInner}: ${itemValue};\n`;
		}
	}

	return document.head.insertAdjacentHTML('afterbegin', `
		<style>
			:root {
				${output}
			}
		</style>
	`);
};

/**
 * Get component/block options and process them in CSS variables.
 *
 * @param {array} attributes      - Built attributes.
 * @param {array} manifest        - Component/block manifest data.
 * @param {string} unique         - Unique key.
 * @param {object} globalManifest - (Optional) Global manifest json.
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
 * outputCssVariables(attributes, manifest, unique, globalManifest);
 * ```
 */
export const outputCssVariables = (attributes, manifest, unique, globalManifest = {}, customSelector = '') => {

	let output = '';

	const outputGloballyFlag = getSettingsConfigOutputCssVariablesGlobally();
	let globalVariables = getSettingsGlobalCssVariables();

	// Read from global cache data if no item is provided using props.
	if (!_.isEmpty(globalManifest)) {
		globalVariables = globalManifest?.globalVariables;
	}

	if (typeof globalVariables === 'undefined') {
		throw Error(`It looks like you are missing variables in the provided globalManifest object. Please check if you data has globalVariables key.`);
	}

	const breakpoints = globalVariables?.breakpoints;

	// Bailout if global breakpoints are missing.
	if (typeof breakpoints === 'undefined') {
		return '';
	}

	// Define variables from manifest.
	const variables = manifest?.variables;
	const variablesEditor = manifest?.variablesEditor;
	const responsiveAttributes = manifest?.responsiveAttributes;

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

	// Check if component or block.
	let name = manifest.componentClass ?? attributes.blockClass;

	if (customSelector !== '') {
		name = customSelector;
	}

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

	// Prepare output style object.
	const styles = {
		name,
		unique,
		variables: [],
	};

	// Loop data and provide correct selectors from data array.
	data.forEach((values) => {

		// Define variables from values.
		const {
			type,
			value,
			variable,
		} = values;

		// If breakpoint value is 0 then don't wrap the media query around it.
		if (value === 0) {
			if (!_.isEmpty(variable)) {
				if (outputGloballyFlag) {
					styles.variables.push({
						type: '',
						variable,
						value,
					});
				} else {
					output += `.${name}[data-id='${unique}'] {
						${variable.join('\n')}
						}
					`;
				}
			}
		} else {
			if (!_.isEmpty(variable)) {
				if (outputGloballyFlag) {
					styles.variables.push({
						type,
						variable,
						value
					});
				} else {
					output += `@media (${type}-width: ${value}px) {
						.${name}[data-id='${unique}'] {
							${variable.join('\n')}
						}
					}
				`;
				}
			}
		}
	});

	// Output manual output from the array of variables.
	let manual = '';

	const variablesCustom = manifest?.variablesCustom;

	if (typeof variablesCustom !== 'undefined') {
		if (outputGloballyFlag) {
			styles.variables.push({
				type: '',
				variable: variablesCustom,
				value: 0
			});
		} else {
			manual = variablesCustom.join(';\n');
		}
	}

	let manualEditor = '';
	const variablesCustomEditor = manifest?.variablesCustomEditor;

	if (typeof variablesCustomEditor !== 'undefined') {
		if (outputGloballyFlag) {
			styles.variables.push({
				type: '',
				variable: variablesCustomEditor,
				value: 0
			});
		} else {
			manualEditor = variablesCustomEditor.join(';\n');
		}
	}

	if (outputGloballyFlag) {
		const existsIndex = getSettingsStyles().findIndex((item) => item.name === name && item.unique === unique);

		if (existsIndex >= 0) {
			getSettingsStyles()[existsIndex] = styles;
		} else {
			getSettingsStyles().push(styles);
		}

		outputCssVariablesCombined();
	} else {
		// Prepare final output for testing.
		const fullOutput = `
			${output}
			${manual}
			${manualEditor}
		`;

		// Check if final output is empty and remove if it is.
		if (_.isEmpty(fullOutput.trim())) {
			return '';
		}

		// Prepare output for manual variables.
		const finalManualOutput = manual || manualEditor ? `.${name}[data-id='${unique}'] {
			${manual}
			${manualEditor}
		}` : '';

		// Output the style for CSS variables.
		return <style dangerouslySetInnerHTML={{__html: `${output} ${finalManualOutput}`}}></style>;
	}

	return null;
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
				if ( typeof slug === 'undefined' || typeof color === 'undefined') {
					break;
				}

				output += `--global-${itemInnerKey}-${value.slug}: ${value.color};\n`;
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
 * Output css variables as a one inline style tag.
 *
 * @access private
 *
 * @returns {string}
 */
export const outputCssVariablesCombined = () => {
	let output = '';

	const styles = getSettingsStyles();

	if (styles) {
		for (const {name, unique, variables} of styles) {
			let outputItem = '';
			for (const {type, value, variable} of variables) {
				if (type === '' && value === 0) {
					outputItem += variable.join('\n');
				} else {
					outputItem += `@media (${type}-width: ${value}px) {
							${variable.join('\n')}
						}
					`;
				}
			}

			output += `.${name}[data-id='${unique}'] {
					${outputItem}
				}
			`;
		}
	}

	const styleTag = document.getElementById('esCssVariables');

	if (!styleTag) {
		return document.head.insertAdjacentHTML('afterbegin', `
		<style id="esCssVariables">
			${output}
		</style>
	`);
	}

	styleTag.innerHTML = output;
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

