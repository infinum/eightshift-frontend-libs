import _ from 'lodash';

/**
 * Check if attribute exist in attributes list and add default value if not.
 *
 * @param {string} key                       - Key to check.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Default attributes from manifest.json.
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @return {mixed}
 */
export const checkAttr = (key, attributes, manifest, undefinedAllowed = false) => {

	if (Object.prototype.hasOwnProperty.call(attributes, key)) {
		return attributes[key];
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
 * @param {object} manifest                  - Array of default attributes from manifest.json.
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
};
