import _ from 'lodash';

/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {object}  attributes      - Attributes from the block/component.
 * @param {string}  realName        - *Old* key to use, usually the name of the block/component.
 * @param {string}  newName         - *New* key to use to rename attributes.
 * @param {boolean} [isBlock=false] - Determines if the helper is used on a block or a component.
 * 
 * @returns object
 */
export const props = (attributes, realName, newName = '', isBlock = false) => {

	let newNameInternal = newName;

	// Check if newName key is passed if not use the default one from block/component name.
	if (newName === '') {
		newNameInternal = realName;
	}

	const output = {};

	// Get global window data.
	const globalData = window['eightshift'][process.env.VERSION].dependency;

	let dependency = [];

	// If it's a block, use the block's dependency tree. If it's a component, use the component's dependency tree.
	if (isBlock) {
		dependency.push(...globalData.blocks[realName]);
	} else {
		dependency.push(...globalData.components[realName]);
	}

	// Add the current component name to the dependency array.
	dependency.push(newNameInternal);

	// If you have multiple components just use one.
	dependency = _.uniq(dependency);

	// Populate componentName for usage in setAttributes.
	output['componentName'] = newNameInternal;

	// Replace stuff if there is any changing of the attribute names.
	if (
		attributes?.parent !== newNameInternal &&
		realName !== newNameInternal &&
		Object.prototype.hasOwnProperty.call(globalData.components, newNameInternal)
	) {

		// Remove real component name from the dependency tree.
		dependency = dependency.filter((item) => item !== realName);

		// Swap componentName with the parent on if attribute name has changed in the parent.
		output['componentName'] = attributes?.parent;
	}

	// Loop attributes.
	for (const [key, value] of Object.entries(attributes)) {

		// Check if attributes key exists in the dependency by comparing the keys partial string.
		if (dependency.some((element) => element === key.slice(0, element.length))) {
			let newKey = key;

			// Change the name of the key if they are different.
			if (realName !== newNameInternal) {
				newKey = key.replace(newNameInternal, realName);
			}

			// Populate output with new values.
			output[newKey] = value;
		}
	}

	// Append parent for usage in checking if attribute name has changed in the parent.
	output['parent'] = newNameInternal;

	return output;
}
