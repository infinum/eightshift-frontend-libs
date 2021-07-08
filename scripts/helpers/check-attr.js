import _ from 'lodash';

/**
 * Check if attribute exist in attributes list and add default value if not.
 * This is used because Block editor will not output attributes that don't have default value.
 *
 * @param {string} key                       - Key to check.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @return {mixed}
 */
export const checkAttr = (key, attributes, manifest, undefinedAllowed = false) => {

	// Check if there is prefix in the attributes object.
	const prefix = attributes?.prefix;
	let newKey = key;

	// If there is no prefix return the key as it was.
	// If there is a prefix, remove the attribute component name prefix and replace it with the new prefix.
	if (typeof prefix !== 'undefined') {

		// No need to test if this is block or component because on top level block there is no prefix.
		newKey = key.replace(_.camelCase(manifest.componentName), prefix);
	}

	// If key exists in the attributes object, just return that key value.
	if (Object.prototype.hasOwnProperty.call(attributes, newKey)) {
		return attributes[newKey];
	} 

	const manifestKey = manifest.attributes[key];

	if (typeof manifestKey === 'undefined') {
		if ('blockName' in manifest) {
			throw Error(`${key} key does not exist in the ${manifest.blockName} block manifest. Please check your implementation.`);
		} else {
			throw Error(`${key} key does not exist in the ${manifest.componentName} component manifest. Please check your implementation.`);
		}
	}

	if (!Object.prototype.hasOwnProperty.call(manifestKey, 'default') && undefinedAllowed) {
		return undefined;
	}

	const defaultType = manifestKey.type;

	let defaultValue;

	switch (defaultType) {
		case 'boolean':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : false;
			break;
		case 'array':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : [];
			break;
		case 'object':
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : {};
			break;
		default:
			defaultValue = Object.prototype.hasOwnProperty.call(manifestKey, 'default') ? manifestKey.default : '';
			break;
	}

	return defaultValue;
};

/**
 * Map and check attributes for responsive object.
 *
 * @param {string} keyName                   - Key name to find in responsiveAttributes object.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @returns {mixed}
 */
export const checkAttrResponsive = (keyName, attributes, manifest, undefinedAllowed = false) => {
	const output = {};

	if (! _.has(manifest, 'responsiveAttributes')) {
		if (typeof manifest['blockName'] === 'undefined') {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['blockName']} block manifest.`);
		} else {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['componentName']} component manifest.`);
		}
	}

	if (!_.has(manifest.responsiveAttributes, keyName)) {
		throw Error(`It looks like you are missing ${keyName} key in your manifest responsiveAttributes object.`);
	}

	for (const [key, value] of Object.entries(manifest.responsiveAttributes[keyName])) {
		output[key] = checkAttr(value, attributes, manifest, undefinedAllowed);
	}

	return output;
}

/**
 * Check if attributes key has prefix and outputs the correct attribute name.
 *
 * @param {string} key       - Key to check.
 * @param {array} attributes - Array of attributes.
 * @param {object} manifest  - Components/blocks manifest.json
 *
 * @return string
 */
export const getAttrKey = (key, attributes, manifest) => {
	const prefix = attributes?.prefix;

	if (typeof prefix === 'undefined') {
		return key;
	}

	// No need to test if this is block or component because on top level block there is no prefix.
	// If there is a prefix, remove the attribute component name prefix and replace it with the new prefix.
	return key.replace(_.camelCase(manifest.componentName), prefix);
}
