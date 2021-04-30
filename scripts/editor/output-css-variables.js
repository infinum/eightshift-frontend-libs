import _ from 'lodash';

/**
 * Get Global Manifest.json and return globalVariables as css variables.
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
 * Process and return global css variables based on the type.
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
 * Get component/block options and process them in css variables.
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

	let name = manifest['componentClass'] ?? attributes['blockClass'];

	name = _.kebabCase(name);

	for (const [key, value] of Object.entries(attributes)) {
		if (! _.has(manifest['attributes'], key) || !_.has(manifest['attributes'][key], 'variable')) {
			continue;
		}

		// Used to reset value and skip variables that are unset.
		if (value === undefined) {
			continue;
		}

		let innerValue = value;

		// Output color variable from the global variables.
		if (manifest['attributes'][key]['variable'] === 'color') {
			innerValue = `var(--global-colors-${innerValue})`;
		}

		// Output select variable from the options array but dont use value key. It will use variable key.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'select') {
			const selectVariable = manifest['options'][key].filter((item) => item.value === attributes[key])[0];
			
			if (typeof selectVariable === 'undefined') {
				continue;
			}

			innerValue = _.has(selectVariable, 'variable') ? selectVariable['variable'] : attributes[key];

			if (innerValue === "") {
				continue;
			}

			if (typeof innerValue === 'object') {
				customOutput = outputCssVariablesCustom(selectVariable['variable'], key, attributes[key]);
			}
		}

		// Output select-responsive variable from the options array.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'select-responsive') {
			const selectResponsiveVariable = manifest['options'][key].filter((item) => item.value === attributes[key])[0];
			
			if (typeof selectResponsiveVariable === 'undefined' || !_.has(selectResponsiveVariable, 'variable')) {
				continue;
			}

			customResponsiveOutput = outputCssVariablesResponsive(selectResponsiveVariable['variable'], key, attributes[key], name, unique);
		}

		// Output boolean variable from the options array key. First key is false value, second is true value.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'boolean' && manifest['options'][key].length === 2) {
			innerValue = manifest['options'][key][Number(attributes[key])];
		}

		// Output custom variable/s from options object.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'custom') {
			customOutput = outputCssVariablesCustom(manifest['options'][key][attributes[key]], key, attributes[key]);
		}

		const innerKey = _.kebabCase(key);

		if (customOutput !== '') {
			output += `${customOutput}\n`;
		} else {
			output += `--${innerKey}: ${innerValue}; \n`;
		}
	}

	// Output manual output from the array of variables.
	const manual = _.has(manifest, 'variables') ? manifest['variables'].join(";\n") : '';
	const manualEditor = _.has(manifest, 'variablesEditor') ? manifest['variablesEditor'].join(";\n") : '';

	const finalOutput = `
		${output}
		${manual}
		${manualEditor}
	`;

	if (_.isEmpty(finalOutput.replace(/^\s+|\s+$/g, ''))) {
		return;
	}

	return <style dangerouslySetInnerHTML={{__html: `
		.${name}[data-id='${unique}'] {
			${finalOutput}
		}
		${customResponsiveOutput}
	`}}></style>;
}

/**
 * Internal helper to loop Css Variables from object.
 *
 * @param object objectList Object list of css variables.
 * @param string attributeKey Attribute key to append to output variable name.
 * @param mixed  originalAttribute Original attribute value used in magic variable.
 *
 * @returns sting
 */
export const outputCssVariablesCustom = (objectList, attributeKey, originalAttribute) => {
	let output = '';

	if (!_.isPlainObject(objectList)) {
		return output;
	}

	for (const [customKey, customValue] of Object.entries(objectList)) {
		let value = customValue;

		// If value contains magic variable swap that variable with original attribute value.
		if (customValue.includes('%value%')) {
			value = customValue.replace('%value%', originalAttribute);
		}

		output += `--${_.kebabCase(attributeKey)}-${_.kebabCase(customKey)}: ${value};\n`;
	}

	return output;
}

/**
 * Internal helper to loop Css Variables from object in responsive manner.
 *
 * @param object arrayList Object list of css variables.
 * @param string attributeKey Attribute key to append to output variable name.
 * @param string originalAttribute Original attribute value used in magic variable.
 * @param string name Block/component name used for selector.
 * @param string unique Unique ID used for selector.
 *
 * @returns sting
 */
export const outputCssVariablesResponsive = (arrayList, attributeKey, originalAttribute, name, unique) => {
	let output = '';

	Object.values(arrayList).forEach((item) => {
		const {
			breakpoint,
			inverse = false,
			variable,
		} = item;

		const innerValue = outputCssVariablesCustom(variable, attributeKey, originalAttribute);

		const orderBreakpint = inverse ? 'max-width' : 'min-width';

		if (typeof breakpoint === 'undefined') {
			output += `
				.${name}[data-id='${unique}'] {
					${innerValue}
				}
			`;
		} else {
			output += `
				@media (${orderBreakpint}: var(--global-breakpoints-${breakpoint})) {
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
