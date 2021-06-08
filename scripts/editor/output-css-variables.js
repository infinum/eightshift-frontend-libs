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
	return Object.entries(responsiveAttributes).reduce((responsiveAttributesVariables, [responsiveAttributeName, responsiveAttributeObject]) => {

		// If responsive attribute doesn't exist in variables object, skip it
		if (!responsiveAttributeName || _.isEmpty(variables[responsiveAttributeName])) {
			return responsiveAttributesVariables;
		}

		// Used for determination of default breakpoint.
		const numberOfBreakpoints = Object.entries(responsiveAttributeObject).length;

		// Iterate each responsive attribute object as breakpoint name is the key of the object, and value represents the name of the responsive variable.
		const responsiveAttributeVariables = Object.entries(responsiveAttributeObject).reduce((responsiveAttribute, [breakpointName, breakpointVariableName], breakpointIndex) => {
			let breakpointVariables = {};

			// Array represents direct value(default or value).
			if (Array.isArray(variables[responsiveAttributeName])) {
				breakpointVariables = setBreakpointResponsiveVariables(variables[responsiveAttributeName], breakpointName, breakpointIndex, numberOfBreakpoints);

			// Object treatment goes depending on a value inserted(multiple choice, boolean or similar).
			} else {

				// Iterate options/multiple choices/boolean...
				breakpointVariables = Object.entries(variables[responsiveAttributeName])
				.reduce((acc, [attributeValue, attributeObject]) => {
					return {
						...acc,
						[attributeValue]: setBreakpointResponsiveVariables(attributeObject, breakpointName, breakpointIndex, numberOfBreakpoints),
					}
				}, {});
			}

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
 * @param {object} attributes - Attributes fetched from manifest.
 * @param {object} variables  - Variables fetched from manifest.
 * @param {object} data       - Preset objects separated in breakpoints.
 *
 * @return {object} Filled object with variables data separated in breakpoints.
 */
const setVariablesToBreakpoints = (attributes, variables, data) => {
	// Iterate each variable.
	for (const [variableName, variableValue] of Object.entries(variables)) {

		// Constant for attributes set value (in db or default).
		const attributeValue = attributes[variableName];

		// Set internal breakpoints variable.
		let internalBreakpoints = [];

		// If type default or value.
		if (!Array.isArray(variableValue)) {
			internalBreakpoints = variableValue[attributeValue] ?? [];
		} else {
			internalBreakpoints = variableValue;
		}

		// Iterate variable array to check breakpoints.
		internalBreakpoints.forEach((breakpointItem) => {

			// Define variables from breakpointItem.
			const {
				breakpoint = 'default', // If breakpoint is not set use default name
				inverse = false, // If inverse is not set use mobile first.
				variable = [],
			} = breakpointItem;

			// Check if we are using mobile or desktop first. Mobile first is the default.
			const type = inverse ? 'max' : 'min';

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

	// Bailout if manifest is missing variables key.
	if (!_.has(manifest, 'variables')) {
		return '';
	}

	// Define variables from globalManifest.
	const {
		breakpoints,
	} = globalManifest.globalVariables;

	// Define variables from manifest.
	const {
		variables,
		variablesEditor,
		responsiveAttributes,
	} = manifest;

	// Get the initial data array.
	const data = prepareVariableData(breakpoints);

	// Check if component or block.
	let name = manifest['componentClass'] ?? attributes['blockClass'];

	// Iterate each responsiveAttribute from responsiveAttributes that appears in variables field.
	if (responsiveAttributes) {
		setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variables), data);
	}

	// Iterate each variable from variables field.
	setVariablesToBreakpoints(attributes, variables, data);

	// Iterate each responsiveAttribute from responsiveAttributes that appears in variablesEditor field.
	if (variablesEditor) {
		if (responsiveAttributes) {
			setVariablesToBreakpoints(attributes, setupResponsiveVariables(responsiveAttributes, variablesEditor), data);
		}

		// Iterate each variable from variablesEditor field.
		setVariablesToBreakpoints(attributes, variablesEditor, data);
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

	// Loop the global breakpoints and populate the data.
	Object.values(globalBreakpoints).forEach((item) => {

		// Initial inner object.
		const itemObject = {
			name: Object.keys(globalBreakpoints).find((key) => globalBreakpoints[key] === item),
			value: item,
			variable: [],
		};

		// Inner object for min values.
		const itemObjectMin = {
			type: 'min',
			...itemObject,
		}

		// Inner object for max values.
		const itemObjectMax = {
			type: 'max',
			...itemObject,
		}

		// Push both min and max to the defined arrays.
		min.push(itemObjectMin);
		max.push(itemObjectMax);
	})

	// Add default object to the top of the array.
	min.unshift({
		type: 'min',
		name: 'default',
		value: 0,
		variable: [],
	});

	// Reverse order of max array.
	max.reverse();

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

	// Bailout if provided variables is not an object.
	if (!_.isPlainObject(variables)) {
		return output;
	}

	// Iterate each attribute and make corrections.
	for (const [variableKey, variableValue] of Object.entries(variables)) {
		let value = variableValue;

		// If value contains magic variable swap that variable with original attribute value.
		if (variableValue.includes('%value%')) {

			// Bailout if magic variable is empty or undefined.
			if (typeof attributeValue === 'undefined' || attributeValue === '') {
				continue;
			}

			value = variableValue.replace('%value%', attributeValue);
		}

		// Bailout if attribute value is empty or undefined, used to unset/reset value.
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
