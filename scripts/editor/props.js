/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object} globalManifest Global manifest object to get the namespace value.
 * @param {object} attributes Object of attributes from block/component.
 * @param {string} realName Old key to use, generally this is the name of the block/component.
 * @param {string} newName New key to use to rename attributes.
 * @param {boolean} isBlock Check if helper is used on block or component.
 * 
 * @returns object
 */
export const props = (globalManifest, attributes, realName, newName = '', isBlock = false) => {

	let newNameInternal = newName;

	// Check if newName key is passed if not use the default one from block/component name.
	if (newName === '') {
		newNameInternal = realName;
	}

	const output = {}

	// Get global window data.
	const globalData = window['eightshift'][globalManifest.namespace].dependency;

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
