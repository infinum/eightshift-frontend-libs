/**
 * Check if attribute exist in attributes list and add default value if not.
 *
 * @param string key Key to check.
 * @param array  attributes Array of attributes.
 * @param array  manifest Array of default attributes from manifest.json.
 * @param string componentName The real component name.
 *
 * @return mixed
 */
export const checkAttr = (key, attributes, manifest, componentName = '') => {

	if ((attributes.hasOwnProperty(key))) {
		return attributes[key];
	} else { // eslint-disable-line no-else-return
		const manifestKey = manifest.attributes[key];

		if (manifestKey === 'undefined') {
			throw Error(`${key} key does not exist in the ${componentName} component. Please check your implementation.`);
		}

		const defaultType = manifestKey.type;

		let defaultValue = '';
	
		switch (defaultType) {
			case 'boolean':
				defaultValue = manifestKey.hasOwnProperty('default') ? manifestKey.default : false;
				break;
			case 'array':
			case 'object':
				defaultValue = manifestKey.hasOwnProperty('default') ? manifestKey.default : [];
				break;
			default:
				defaultValue = manifestKey.hasOwnProperty('default') ? manifestKey.default : '';
				break;
		}
	
		return defaultValue;
	}
};
