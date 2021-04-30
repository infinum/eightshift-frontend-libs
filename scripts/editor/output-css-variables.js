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
 *
 * @return string
 */
export const outputCssVariables = (attributes, manifest, unique) => {
	let output = '';
	let customOutput = '';
	let customResponsiveOutput = '';

	if (!attributes || !manifest) {
		return output;
	}

	// Check if component or block.
	let name = manifest['componentClass'] ?? attributes['blockClass'];

	// Convert name to correct case.
	name = _.kebabCase(name);

	// Iterate each attribute and make corrections.
	for (const [key, value] of Object.entries(attributes)) {

		// Bailout if attribute is not using variables.
		if (! _.has(manifest['attributes'], key) || !_.has(manifest['attributes'][key], 'variable')) {
			continue;
		}

		// Check type of variable.
		const variableType = manifest['attributes'][key]['variable'];

		// Used to reset value and skip variables that are unset.
		if (value === undefined) {
			continue;
		}

		let innerValue = value;

		switch (variableType) {
			case 'color': {
				// Output color variable from the global variables.
				innerValue = `var(--global-colors-${innerValue})`;

				break;
			}
			case 'select':
			case 'select-responsive': {
				// Output select variable.

				// Each type requires options key.
				if (!_.has(manifest['options'], key)) {
					continue;
				}

				// Find select item from the attribute set in the db.
				const selectVariable = manifest['options'][key].filter((item) => item.value === attributes[key])[0];
				
				// Bailout if option is missing.
				if (typeof selectVariable === 'undefined') {
					continue;
				}

				// Output select variable from the options array but don't use value key. It will use variable key.
				if (variableType === 'select') {

					// If custom variable is missing fallback to default.
					innerValue = _.has(selectVariable, 'variable') ? selectVariable['variable'] : attributes[key];

					// Bailout if slug or variable key is missing.
					if (innerValue === "") {
						continue;
					}

					// Output custom variables if variables key is object.
					customOutput = outputCssVariablesCustom(selectVariable['variable'], key, attributes[key]);
				}

				// Output select-responsive variable from the options array.
				if (variableType === 'select-responsive') {

					// Bailout if variable key is missing because there is no fallback here.
					if (!_.has(selectVariable, 'variable')) {
						continue;
					}

					// Output custom variables if variables key is array of objects.
					customResponsiveOutput = outputCssVariablesResponsive(selectVariable['variable'], key, attributes[key], name, unique);
				}

				break;
			}
			case 'boolean': {
				// Output boolean variable from the options array key. First key is false value, second is true value.

				// Each type requires options key.
				if (!_.has(manifest['options'], key)) {
					break;
				}

				// Bailout if missing boolean options in array.
				if (manifest['options'][key].length !== 2) {
					break;
				}

				// Output variables depending on the boolean. First key is false.
				innerValue = manifest['options'][key][Number(attributes[key])];

				break;
			}
			case 'custom': {
				// Output custom variables if variables key is object.

				// Each type requires options key.
				if (!_.has(manifest['options'], key)) {
					continue;
				}

				customOutput = outputCssVariablesCustom(manifest['options'][key][attributes[key]], key, attributes[key]);
				break;
			}
		}

		// Convert key to correct case.
		const innerKey = _.kebabCase(key);

		// If custom output is empty use normal key value pair.
		if (customOutput !== '') {
			output += `${customOutput}\n`;
		} else {
			output += `--${innerKey}: ${innerValue}; \n`;
		}
	}

	// Output manual output from the array of variables.
	const manual = _.has(manifest, 'variables') ? manifest['variables'].join(";\n") : '';
	const manualEditor = _.has(manifest, 'variablesEditor') ? manifest['variablesEditor'].join(";\n") : '';

	// Prepare final output.
	const finalOutput = `
		${output}
		${manual}
		${manualEditor}
	`;

	// Check if final output is empty and and remove if it is.
	if (_.isEmpty(finalOutput.replace(/^\s+|\s+$/g, ''))) {
		return;
	}

	// Output the style for CSS variables.
	return <style dangerouslySetInnerHTML={{__html: `
		.${name}[data-id='${unique}'] {
			${finalOutput}
		}
		${customResponsiveOutput}
	`}}></style>;
}

/**
 * Internal helper to loop CSS Variables from object.
 *
 * @param object list Object list of CSS variables.
 * @param string attributeKey Attribute key to append to output variable name.
 * @param mixed  originalAttribute Original attribute value used in magic variable.
 *
 * @returns sting
 */
export const outputCssVariablesCustom = (list, attributeKey, originalAttribute) => {
	let output = '';

	// Bailout if provided list is not an object.
	if (!_.isPlainObject(list)) {
		return output;
	}

	// Iterate each attribute and make corrections.
	for (const [customKey, customValue] of Object.entries(list)) {
		let value = customValue;

		// If value contains magic variable swap that variable with original attribute value.
		if (customValue.includes('%value%')) {
			value = customValue.replace('%value%', originalAttribute);
		}

		// Output the custom CSS variable by adding the attribute key + custom object key.
		output += `--${_.kebabCase(attributeKey)}-${_.kebabCase(customKey)}: ${value};\n`;
	}

	return output;
}

/**
 * Internal helper to loop CSS Variables from array of objects in an responsive manner.
 *
 * @param object list Object list of CSS variables.
 * @param string attributeKey Attribute key to append to output variable name.
 * @param mixed  originalAttribute Original attribute value used in magic variable.
 * @param string name Block/component name used for selector.
 * @param string unique Unique ID used for selector.
 *
 * @returns sting
 */
export const outputCssVariablesResponsive = (list, attributeKey, originalAttribute, name, unique) => {
	let output = '';

	// Iterate each attribute and make corrections.
	Object.values(list).forEach((item) => {

		const {
			breakpoint,
			inverse = false,
			variable,
		} = item;

		// Output CSS variables from the variables object.
		const innerValue = outputCssVariablesCustom(variable, attributeKey, originalAttribute);

		// Check if we are using mobile or desktop first. Mobile first is the default.
		const orderBreakpoint = inverse ? 'max-width' : 'min-width';

		// Output normal selector if breakpoint is not defined (used for top level element like mobile).
		// Else wrap it in media query condition.
		if (typeof breakpoint === 'undefined') {
			output += `
				.${name}[data-id='${unique}'] {
					${innerValue}
				}
			`;
		} else {
			output += `
				@media (${orderBreakpoint}: var(--global-breakpoints-${breakpoint})) {
					.${name}[data-id='${unique}'] {
						${innerValue}
					}
				}
			`;
		}
	});

	return output;
}

/**
 * Return unique ID for block processing.
 *
 * @return string
 */
export const getUnique = () => {
	return require("crypto").randomBytes(16).toString('hex');
}
