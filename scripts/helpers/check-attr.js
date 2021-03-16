/**
 * Check if attribute exist in attributes list and add default value if not.
 *
 * @param {string} key Key to check.
 * @param {array} attributes Array of attributes.
 * @param {object} manifest Array of default attributes from manifest.json.
 * @param {string} componentName The real component name.
 * @param {string} setType Override manifest key check and manually set default value.
 *
 * @return mixed
 */
export const checkAttr = (key, attributes, manifest, componentName = '', setType = '') => {

	if (Object.prototype.hasOwnProperty.call(attributes, key)) {
		return attributes[key];
	} else {
		const manifestKey = manifest.attributes[key];

		if (manifestKey === 'undefined' && ! setType) {
			throw Error(`${key} key does not exist in the ${componentName} component. Please check your implementation.`);
		}

		const defaultType = manifestKey.type && setType;

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
	}
};
