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
			output += outputCssVariablesGlobalInner(itemValue, itemKeyInner);
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
export const outputCssVariablesGlobalInner = (itemValues, itemKey) => {
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
	let data = {};
	let output = '';

	if (!attributes || !manifest) {
		return output;
	}

	// Check if component or block.
	let name = manifest['componentClass'] ?? attributes['blockClass'];

	// Iterate each attribute and make corrections.
	for (const [attributeName, attributeValue] of Object.entries(attributes)) {

		// Bailout if attribute is not using variables.
		if (! _.has(manifest['attributes'], attributeName) || !_.has(manifest['attributes'][attributeName], 'variable')) {
			continue;
		}
		// Bailout if variables key is not existing or attribute key is non existing in variables object.
		if (! _.has(manifest, 'variables') || !_.has(manifest['variables'], attributeName)) {
			continue;
		}

		// Check type of variable.
		const variableType = manifest['attributes'][attributeName]['variable'];
		const variables = manifest['variables'][attributeName];

		switch (variableType) {
			case 'value':

				// Bailout if attribute value doesn't exist in variables.
				if (! _.has(variables, attributeValue)) {
					break;
				}

				data = outputCssVariablesResponsive(variables[attributeValue], attributeValue, globalManifest, data);
				break;

			default:
				data = outputCssVariablesResponsive(variables, attributeValue, globalManifest, data);
				break;
		}
	}

	// Loop data and provide correct selectors from data object.
	if (!_.isEmpty(data)) {
		for (const [breakpoint, breakpointData] of Object.entries(data)) {

			// If this is default dont wrap the media query around it.
			if (breakpoint === 'default') {
				output += `.${name}[data-id='${unique}'] {
						${breakpointData.join("\n")}
					}
				`;
			} else {
				output += `@media (${breakpoint}) {
						.${name}[data-id='${unique}'] {
							${breakpointData.join("\n")}
						}
					}
				`;
			}
		}
	}

	// Output manual output from the array of variables.
	const manual = _.has(manifest, 'variablesCustom') ? manifest['variablesCustom'].join(";\n") : '';
	const manualEditor = _.has(manifest, 'variablesEditor') ? manifest['variablesEditor'].join(";\n") : '';

	// Prepare final output.
	const finalOutput = `
		${output}
		${manual}
		${manualEditor}
	`;

		// Check if final output is empty and remove if it is.
	if (_.isEmpty(finalOutput.replace(/^\s+|\s+$/g, ''))) {
		return;
	}

	// Output the style for CSS variables.
	return <style dangerouslySetInnerHTML={{__html: `${finalOutput}`}}></style>;
}

/**
 * Internal helper to loop CSS Variables from array.
 *
 * @param array variables Array of variables of CSS variables.
 * @param mixed attributeValue Original attribute value used in magic variable.
 *
 * @returns array
 */
export const outputCssVariablesInner = (variables, attributeValue) => {
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

		// Output the custom CSS variable by adding the attribute key + custom object key.
		output.push(`--${_.kebabCase(variableKey)}: ${value};`);
	}

	return output;
}

/**
 * Internal helper to loop CSS Variables from array of objects in an responsive manner.
 *
 * @param array  breakpoints Breakpoints array list of CSS variables.
 * @param mixed  attributeValue Original attribute value used in magic variable.
 * @param object globalManifest Global manifest json.
 * @param object data Data object from parent.
 *
 * @returns object
 */
export const outputCssVariablesResponsive = (breakpoints, attributeValue, globalManifest, data) => {

	// Bailout if globalVariables or breakpoints are missing.
	if (!_.has(globalManifest, 'globalVariables') || !_.has(globalManifest.globalVariables, 'breakpoints')) {
		return data;
	}

	// Iterate each attribute and make corrections.
	Object.values(breakpoints).forEach((item) => {

		const breakpoint = item['breakpoint'];
		const inverse = item['inverse'];
		const variable = item['variable'];

		// Find the actual value of the breakpoint.
		const breakpointValue = globalManifest.globalVariables.breakpoints[breakpoint];

		// Output CSS variables from the variables object.
		const innerValue = outputCssVariablesInner(variable, attributeValue);

		// Check if we are using mobile or desktop first. Mobile first is the default.
		const orderBreakpoint = inverse ? 'max-width' : 'min-width';

		// Output normal selector if breakpoint is not defined (used for top level element like mobile).
		// Else wrap it in media query condition.
		if (typeof breakpointValue === 'undefined') {
			if (_.has(data, 'default')) {
				data['default'] = data['default'].concat(innerValue);
			} else {
				data['default'] = innerValue;
			}
		} else {
			if (_.has(data, `${orderBreakpoint}: ${breakpointValue}px`)) {
				data[`${orderBreakpoint}: ${breakpointValue}px`] = data[`${orderBreakpoint}: ${breakpointValue}px`].concat(innerValue);
			} else {
				data[`${orderBreakpoint}: ${breakpointValue}px`] = innerValue;
			}
		}
	});

	return data;
}

/**
 * Return unique ID for block processing.
 *
 * @return string
 */
export const getUnique = () => {
	return require("crypto").randomBytes(16).toString('hex');
}
