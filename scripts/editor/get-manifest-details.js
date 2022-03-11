/**
 * Return project details from global window object.
 *
 * @access public
 *
 * @returns {object}
 */
export const getSettings = (type, item = '') => {
	const data = window?.['eightshift']?.[process.env.VERSION];

	if (typeof data === 'undefined') {
		throw Error(`It looks like there is no data to provide in global window object for eightshift - ${process.env.VERSION}.`);
	}

	if (type === 'block' || type === 'component') {
		let name = 'blockName';

		if (type === 'component') {
			name = 'componentName';
		}

		const items = data[type].find((item) => item[name] === item);

		if (!items) {
			throw Error(`Item ${item} not found in the ${type} settings or the output data is empty. Please check if the provided key and parent is correct.`);
		}

		return items;
	}

	if (item) {
		const items = data?.[type]?.[item];

		if (typeof items === 'undefined') {
			throw Error(`Key ${item} not found in the ${type} - ${item} settings or the output data is empty. Please check if the provided key and parent is correct.`);
		}

		return items;
	}


	const items = data?.[type];

	if (typeof items === 'undefined') {
		throw Error(`Key ${type} not found in the settings or the output data is empty. Please check if the provided key and parent is correct.`);
	}

	return items;
};

/**
 * Returns block full name that contains namespace and block name.
 *
 * @access public
 *
 * @returns {string}
 */
export const getSettingsBlockFullName = (blockName) => {
	const namespace = getSettings('settings', 'namespace');
	const block = getSettings('block', blockName);

	return namespace && block ? `${namespace}/${block}` : '';
};
