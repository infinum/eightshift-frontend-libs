/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object}  attributes                         - Attributes from the block/component.
 * @param {string}  realName                           - *Old* key to use, usually the name of the block/component.
 * @param {string}  newName                            - *New* key to use to rename attributes.
 * @param {boolean} [isBlock=false]                    - Determines if the helper is used on a block or a component.
 * @param {string}  [namespace=eightshift-boilerplate] - Use default namespace for getting the correct values from the global window.
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
	// Add the current component name to the dependency array.
	let dependency = [
		...globalData.components[realName],
		newNameInternal
	];

	// If block use blocks dependency tree.
	if (isBlock) {
		dependency = globalData.blocks[realName];
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
