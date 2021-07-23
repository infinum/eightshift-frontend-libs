import { getAttrKey } from '../helpers/check-attr';
import _ from 'lodash';

/**
 * Get Global manifest.json and return global variables as CSS variables.
 *
 * @param {array} globalManifest - Global variable data.
 *
 * @return {string|void}
 */
export const outputCssVariablesGlobal = (globalManifest) => {

	let output = '';

	if (!globalManifest || !_.has(globalManifest, 'globalVariables')) {
		return output;
	}

	for (const [itemKey, itemValue] of Object.entries(globalManifest['globalVariables'])) {
		const itemKeyInner = _.kebabCase(itemKey);

		if (_.isObject(itemValue)) {
			output += globalInner(itemValue, itemKeyInner);
		} else {
			output += `--global-${itemKeyInner}: ${itemValue};\n`;
		}
	}

	if (!output) {
		return '';
	}

	return document.head.insertAdjacentHTML('afterbegin', `
		<style>
			:root {
				${output}
			}
		</style>
	`);
}

/**
 * Process and return global CSS variables based on the type.
 *
 * @param {array} itemValues - Values to check.
 * @param {string} itemKey   - Item key to check.
 *
 * @return {string}
 */
export const globalInner = (itemValues, itemKey) => {
	let output = '';

	for (const [key, value] of Object.entries(itemValues)) {
		const innerKey = _.kebabCase(key);
		const itemInnerKey = _.kebabCase(itemKey);

		switch (itemInnerKey) {
			case 'colors':
				output += `--global-${itemInnerKey}-${value['slug']}: ${value['color']};\n`;
				break;
			case 'gradients':
				output += `--global-${itemInnerKey}-${value['slug']}: ${value['gradient']};\n`;
				break;
			case 'font-sizes':
				output += `--global-${itemInnerKey}-${value['slug']}: ${value['slug']};\n`;
				break;
			default:
				output += `--global-${itemInnerKey}-${innerKey}: ${value};\n`;
				break;
		}
	}

	return output;
}

/**
 * Extracting the names of default breakpoints depending on the case used in responsive(mobile first/desktop first).
 * Returning the 'min' key with default name for mobile first, and the 'max' key for desktop first version.
 * If there are no breakpoints, min and max will be empty strings.
 * 
 * @param {string} breakpoints - Sorted breakpoints that are read from global manifest.
 * 
 * @return {object} Object with min and max keys.
 */
const getDefaultBreakpoints = (breakpoints) => {
	return {
		min: breakpoints?.[0]?.[0] || '',
		max: breakpoints?.[breakpoints.length - 1]?.[0] || '',
	};
}

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
const setBreakpointResponsiveVariables = (attributeVariables, breakpointName, breakpointIndex, numberOfBreakpoints) => {
	return attributeVariables.map((attributeVariablesObject) => {

		// Calculate default breakpoint index based on order of the breakpoint, inverse property and number of properties in responsiveAttributeObject.
		const defaultBreakpointIndex = attributeVariablesObject.inverse ? 0 : (numberOfBreakpoints - 1);

		// Expanding an object with an additional breakpoint property.
		return {
			...attributeVariablesObject,
			breakpoint: breakpointIndex === defaultBreakpointIndex ? 'default' : breakpointName,
		};
	})
}

/**
 * Iterating through variables matching the keys from responsiveAttributes and translating it to responsive attributes names.
 *
 * @param {object} responsiveAttributes - Responsive attributes that are read from component's/block's manifest.
 * @param {object} variables            - Object containing objects with component's/block's attribute variables that are read from manifest.
 *
 * @return {object} Object prepared for setting all the variables to its breakpoints.
 */
const setupResponsiveVariables = (responsiveAttributes, variables) => {
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
							}
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
}

/**
 * Setting defined variables to each breakpoint.
 *
 * @param {object} attributes					- Attributes fetched from manifest.
 * @param {object} variables					- Variables fetched from manifest.
 * @param {object} data								- Preset objects separated in breakpoints.
 * @param {array} manifest						- Component/block manifest data.
 * @param {object} defaultBreakpoints	- Default breakpoints for mobile/desktop first.
 *
 * @return {object} Filled object with variables data separated in breakpoints.
 */
const setVariablesToBreakpoints = (attributes, variables, data, manifest, defaultBreakpoints) => {
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
}

/**
 * Get component/block options and process them in CSS variables.
 *
 * @param {array} attributes      - Built attributes.
 * @param {array} manifest        - Component/block manifest data.
 * @param {string} unique         - Unique key.
 * @param {object} globalManifest - Global manifest json.
 *
 * @return {string}
 */
export const outputCssVariables = (attributes, manifest, unique, globalManifest) => {

	let output = '';

	// Bailout if global breakpoints are missing.
	if (!_.has(globalManifest, 'globalVariables') || !_.has(globalManifest.globalVariables, 'breakpoints')) {
		return '';
	}

	// Bailout if attributes or manifest is missing.
	if (!attributes || !manifest) {
		return '';
	}

	// Bailout if manifest is missing any of variables key.
	if (
		!_.has(manifest, 'variables') &&
		!_.has(manifest, 'variablesEditor') &&
		!_.has(manifest, 'variablesCustom') &&
		!_.has(manifest, 'variablesCustomEditor')
	) {
		return '';
	}

	// Define variables from globalManifest.
	const {
		breakpoints: globalBreakpoints,
	} = globalManifest.globalVariables;

	// Define variables from manifest.
	const {
		variables,
		variablesEditor,
		responsiveAttributes,
	} = manifest;

	const sortedBreakpoints = Object.entries(globalBreakpoints)
		.sort((a, b) => {
			return a[1] - b[1]; // Sort from the smallest to the largest breakpoint.
		});

	const defaultBreakpoints = getDefaultBreakpoints(sortedBreakpoints);

	// Get the initial data array.
	const data = prepareVariableData(sortedBreakpoints);

	// Check if component or block.
	let name = manifest['componentClass'] ?? attributes['blockClass'];

	if (variables) {

		// Iterate each responsiveAttribute from responsiveAttributes that appears in variables field.
		if (responsiveAttributes) {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variables), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variables field.
		setVariablesToBreakpoints(attributes, variables, data, manifest, defaultBreakpoints);
	}

	// Iterate each responsiveAttribute from responsiveAttributes that appears in variablesEditor field.
	if (variablesEditor) {
		if (responsiveAttributes) {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variablesEditor), data, manifest, defaultBreakpoints);
		}

		// Iterate each variable from variablesEditor field.
		setVariablesToBreakpoints(attributes, variablesEditor, data, manifest, defaultBreakpoints);
	}

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
				output += `.${name}[data-id='${unique}'] {
					${variable.join('\n')}
					}
				`;
			}
		} else {
			if (!_.isEmpty(variable)) {
				output += `@media (${type}-width: ${value}px) {
						.${name}[data-id='${unique}'] {
							${variable.join('\n')}
						}
					}
				`;
			}
		}
	});

	// Output manual output from the array of variables.
	const manual = _.has(manifest, 'variablesCustom') ? manifest['variablesCustom'].join(';\n') : '';
	const manualEditor = _.has(manifest, 'variablesCustomEditor') ? manifest['variablesCustomEditor'].join(';\n') : '';

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

/**
 * Create initial array of data to be able to populate later.
 *
 * @param {object} globalBreakpoints - Global breakpoints from global manifest to set the correct output.
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
		}

		// Inner object for max values.
		const itemObjectMax = {
			...itemObject,
			type: 'max',
		}

		// Transfer value to a larger breakpoint.
		minBreakpointValue = value;

		// Push both min and max to the defined arrays.
		min.push(itemObjectMin);
		max.push(itemObjectMax);
	})

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
}

/**
 * Internal helper to loop CSS Variables from array.
 *
 * @param {array} variables      - Array of variables of CSS variables.
 * @param {mixed} attributeValue - Original attribute value used in magic variable.
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
}

/**
 * Returns a unique ID.
 *
 * @return {string}
 */
export const getUnique = () => {
	return require('crypto').randomBytes(16).toString('hex');
}
