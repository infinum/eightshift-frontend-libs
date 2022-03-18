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

	// If type is block or component.
	if (type === 'block' || type === 'component') {
		let keyName = 'blockName';
		let keyDetails = 'blocks';

		if (type === 'component') {
			keyName = 'componentName';
			keyDetails = 'components';
		}

		const items = data[keyDetails].find((item) => item[keyName] === item);

		if (!items) {
			throw Error(`Item ${item} not found in the ${type} settings or the output data is empty. Please check if the provided key and parent is correct.`);
		}

		return items;
	}

	// If searching for one item in array.
	if (item) {
		const items = data?.[type]?.[item];

		if (typeof items === 'undefined') {
			throw Error(`Key ${item} not found in the ${type} - ${item} settings or the output data is empty. Please check if the provided key and parent is correct.`);
		}

		return items;
	}

	// If searching for one item only.
	const items = data?.[type];

	if (typeof items === 'undefined') {
		throw Error(`Key ${type} not found in the settings or the output data is empty. Please check if the provided key and parent is correct.`);
	}

	return items;
};
