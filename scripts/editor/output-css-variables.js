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
		return;
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

	if (!attributes || !manifest) {
		return output;
	}

	let name = manifest['componentClass'] ?? attributes['blockClass'];

	name = _.kebabCase(name);

	for (const [key, value] of Object.entries(attributes)) {
		if (! _.has(manifest['attributes'], key) || !_.has(manifest['attributes'][key], 'variable')) {
			continue;
		}

		let innerValue = value;

		// Output color variable from the global variables.
		if (manifest['attributes'][key]['variable'] === 'color') {
			innerValue = `var(--global-colors-${innerValue})`;
		}

		// Output select variable from the options array but dont use value key. It will use variable key.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'select-variable') {
			const selectVariable = manifest['options'][key].filter((item) => item.value === attributes[key])[0].variable;
			innerValue = typeof selectVariable === 'undefined' ? attributes[key] : selectVariable;
		}

		// Output boolean variable from the options array key. First key is false value, second is true value.
		if (_.has(manifest['options'], key) && manifest['attributes'][key]['variable'] === 'boolean-variable' && manifest['options'][key].length === 2) {
			innerValue = manifest['options'][key][Number(attributes[key])];
		}

		const innerKey = _.kebabCase(key);

		output += `--${innerKey}: ${innerValue};\n`;
	}

	// Output manual output from the array of variables.
	const manual = _.has(manifest, 'variables') ? manifest['variables'].join(";\n") : '';

	return <style dangerouslySetInnerHTML={{__html: `
		.${name}[data-id='${unique}'] {
			${output}
			${manual}
		}
	`}}></style>;
}


/**
 * Return unique ID for block processing.
 *
 * @return string
 */
export const getUnique = () => {
	return require("crypto").randomBytes(16).toString('hex');
}
