import _ from 'lodash';

/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {string} newName     - *New* key to use to rename attributes.
 * @param {object} attributes  - Attributes from the block/component.
 * @param {object} [manual={}] - Object of attributes to change key and merge to the original output.
 * 
 * @returns {object}
 *
 * Manifest:
 * ```js
 * const attributes = {
 *   buttonColor: 'red',
 *   buttonSize: 'big',
 *   buttonIcon: 'blue',
 *   blockName: 'button',
 *   wrapperSize: 'big',
 *   wrapperType: 'normal',
 * };
 * ```
 *
 * Usage:
 * ```js
 * {...props('button', attributes)}
 * ```
 *
 * Output:
 * ```js
 * {
 *   buttonColor: 'red',
 *   buttonSize: 'big',
 *   buttonIcon: 'blue',
 *   blockName: 'button',
 * };
 * ```
 *
 * Additional keys that are passed are defined in the includes array.
 */
export const props = (newName, attributes, manual = {}) => {

	const output = {};

	// Check what attributes we need to includes.
	const includes = [
		'blockName',
		'blockFullName',
		'blockClass',
		'blockJsClass',
		'componentJsClass',
		'selectorClass',
		'additionalClass',
		'setAttributes',
		'uniqueWrapperId',
		'options',
		'clientId',
	];

	// Check if in test mode and use different setting.
	const blockName = process.env.NODE_ENV === 'test' ? attributes.blockName.default : attributes.blockName;

	// Populate prefix key for recursive checks of attribute names.
	const prefix = (typeof attributes.prefix === 'undefined') ? _.camelCase(blockName) : attributes['prefix'];

	// Set component prefix.
	if ( prefix === '' ) {
		output['prefix'] = _.camelCase(newName);
	} else {
		output['prefix'] = `${prefix}${_.upperFirst(_.camelCase(newName))}`;
	}

	// Iterate over attributes.
	for (const [key, value] of Object.entries(attributes)) {

		// Includes attributes from iteration.
		if (includes.includes(key)) {
			Object.assign(output, {[key]: value});
			continue;
		}

		// If attribute starts with the prefix key leave it in the object if not remove it.
		if (key.startsWith(output['prefix'])) {
			Object.assign(output, {[key]: value});
		}
	}

	// Check if you have manual object and prepare the attribute keys and merge them with the original attributes for output.
	if (!_.isEmpty(manual)) {
		// Iterate manual attributes.
		for (let [key, value] of Object.entries(manual)) {

			// Includes attributes from iteration.
			if (includes.includes(key)) {
				Object.assign(output, {[key]: value});
				continue;
			}

			// Remove the current component name from the attribute name.
			const newKey = key.replace(`${_.lowerFirst(_.camelCase(newName))}`, '');

			// Remove the old key.
			delete manual[key];

			// // Add new key to the output with prepared attribute name.
			Object.assign(manual, {[`${output['prefix']}${newKey}`]: value})
		}

		// Merge manual and output objects to one.
		Object.assign(output, manual);
	}

	// Return the original attribute for optimization purposes.
	return output;
}
