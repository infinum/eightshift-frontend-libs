import _ from 'lodash';

/**
 * Get Global Manifest.json and return globalVariables as CSS variables.
 *
 * @param array globalManifest Array of global variables data.
 *
 * @return string
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
 * @param array  itemValues Values of data to check.
 * @param string itemKey    Item key to check.
 *
 * @return string
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
 * Get component/block options and process them in CSS variables.
 *
 * @param array  attributes Built attributes.
 * @param array  manifest Component/block manifest data.
 * @param string unique Unique key.
 * @param object globalManifest Global manifest json.
 *
 * @return string
 */
export const outputCssVariables = (attributes, manifest, unique, globalManifest) => {

	let output = '';

	// Bailout if global breakpoints are missing.
	if (!_.has(globalManifest, 'globalVariables') || !_.has(globalManifest.globalVariables, 'breakpoints')) {
		return;
	}

	// Bailout if attributes or manifest i missing.
	if (!attributes || !manifest) {
		return;
	}

	// Bailout if manifest is missing variables key.
	if (!_.has(manifest, 'variables')) {
		return;
	}

	// Define variables from globalManifest.
	const {
		breakpoints,
	} = globalManifest.globalVariables;

	// Define variables from manifest.
	const {
		variables,
	} = manifest;

	// Get the initial data array.
	const data = prepareVariableData(breakpoints);

	// Check if component or block.
	let name = manifest['componentClass'] ?? attributes['blockClass'];

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
			});
		});
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
	const manualEditor = _.has(manifest, 'variablesEditor') ? manifest['variablesEditor'].join(';\n') : '';

	// Prepare final output.
	const finalOutput = `
		${output}
		${manual}
		${manualEditor}
	`;

		// Check if final output is empty and remove if it is.
	if (_.isEmpty(finalOutput.trim())) {
		return;
	}

	// Output the style for CSS variables.
	return <style dangerouslySetInnerHTML={{__html: `${finalOutput}`}}></style>;
}

/**
 * Create initial array of data to be able to populate later.
 *
 * @param object globalBreakpoints Global breakpoints from global manifest to set the correct output.
 *
 * @return array
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
 * @param array variables Array of variables of CSS variables.
 * @param mixed attributeValue Original attribute value used in magic variable.
 *
 * @returns array
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
 * Return unique ID for block processing.
 *
 * @return string
 */
export const getUnique = () => {
	return require('crypto').randomBytes(16).toString('hex');
}
