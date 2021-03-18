/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object} attributes Object of attributes from block/component.
 * @param {string} realName Old key to use, generally this is the name of the block/component.
 * @param {string} newName New key to use to rename attributes.
 * @param {boolean} isBlock Check if helper is used on block or component.
 * @param {string} namespace Default namespace is used from the global manifest settings. If this helper is used on a different namespace it can be changed by this key.
 * 
 * @returns object
 */
export const props = (attributes, realName, newName = '', isBlock = false, namespace = 'eightshift-boilerplate') => {

	let newNameInternal = newName;

	// Check if newName key is passed if not use the default one from block/component name.
	if (newName === '') {
		newNameInternal = realName;
	}

	const output = {}

	// Get global window data.
	const globalData = window['eightshift'][namespace].dependency;

	// If component use components dependency tree.
	let dependency = globalData.components[realName];

	// If block use blocks dependency tree.
	if (isBlock) {
		dependency = globalData.blocks[realName];
	}

	// If dependency is empty put the name in the array for the easier checks later on.
	if (!dependency.length) {
		dependency = [newNameInternal];
	}

	for (const [key, value] of Object.entries(attributes)) {

		// Check if attributes key exists in the dependency by comparing the keys partial string.
		if (dependency.some((element) => element === key.slice(0, element.length))) {
			let newKey = key;

			// Change the name of the key if they are different.
			if (realName !== newNameInternal) {
				newKey = realName + key.slice(newNameInternal.length);
			}

			output[newKey] = value;
		}
	}

	// Append componentName for usage.
	output['componentName'] = newNameInternal;

	return output;
}
