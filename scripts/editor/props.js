import _ from 'lodash';

/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object}  attributes - Attributes from the block/component.
 * @param {string}  newName    - *New* key to use to rename attributes.
 * 
 * @returns object
 */
export const props = (attributes, newName) => {

	const output = {};

	// Check what attributes we need to includes.
	const includes = [
		'blockName',
		'blockFullName',
		'blockClass',
		'blockJsClass',
		'selectorClass',
		'additionalClass',
		'setAttributes'
	]
	
	// Populate prefix key for recursive checks of attribute names.
	if (typeof attributes.prefix === 'undefined') {
		output['prefix'] = _.camelCase(newName);
	} else {
		output['prefix'] = `${attributes['prefix']}${_.upperFirst(_.camelCase(newName))}`;
	}

	// Iterate over attributes.
	for (const [key, value] of Object.entries(attributes)) {

		// Includes attributes from iteration.
		if (includes.includes(key)) {
			Object.assign(output, {[key]: value});
		}

		// If attribute starts with the prefix key leave it in the object if not remove it.
		if (key.startsWith(output['prefix'])) {
			Object.assign(output, {[key]: value});
		}
	}

	// Return the original attribute for optimization purposes.
	return output;
}
