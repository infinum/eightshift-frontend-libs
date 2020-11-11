/**
 * Check if attribute exist in attributes list and add default value if not.
 *
 * @param string $key Key to check.
 * @param array  $attributes Array of attributes.
 * @param array  $manifest Array of default attributes from manifest.json.
 *
 * @return mixed
 */
export const checkAttr = (key, attributes, manifest) => {
	const manifestKey = manifest.attributes[key];
	const defaultType = manifestKey.type;

	let defaultValue = '';

	switch (defaultType) {
		case 'boolean':
			defaultValue = manifest.attributes[key].hasOwnProperty('default') ? manifest.attributes[key].default : false;
			break;
		case 'array':
		case 'object':
			defaultValue = manifest.attributes[key].hasOwnProperty('default') ? manifest.attributes[key].default : [];
			break;
		default:
			defaultValue = manifest.attributes[key].hasOwnProperty('default') ? manifest.attributes[key].default : '';
			break;
	}

	return attributes.hasOwnProperty(key) ? attributes[key] : defaultValue;
};
