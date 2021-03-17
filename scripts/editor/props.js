/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object} attributes Object of attributes from block/component.
 * @param {string} keyNameNew New key to use to rename attributes.
 * @param {string} keyNameOld Old key to use, generally this is the name of the block/component.
 * 
 * @returns object
 */
export const props = (attributes, keyNameNew, keyNameOld = '') => {
	const onlyAttributes = {};

	let oldKey = keyNameOld;

	// Check if old key is set.
	if (oldKey === '') {
		oldKey = keyNameNew;
	}

	// Loop attributes provided.
	for (const [key, value] of Object.entries(attributes)) {

		// Find only attributes that contains keyName.
		if (key.includes(oldKey)) {
			let newName = key;

			// Replace attribute name with the new one.
			if (oldKey !== keyNameNew) {
				newName = key.replace(oldKey, keyNameNew);
			}

			onlyAttributes[newName] = value;
		}
	}

	// Append componentName for usage.
	onlyAttributes['componentName'] = oldKey;

	return onlyAttributes;
}
