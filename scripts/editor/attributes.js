import _ from 'lodash';

/**
 * Sets attributes on all `innerBlocks`. This value will be stored in the Block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
 * @param {object} attributesObject Object of attributes to apply.
 * @param {array} exclude Array of block names to exclude.
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * import { useSelect } from '@wordpress/data';
 *
 * useSelect((select) => {
 *   overrideInnerBlockAttributes(
 *     select,
 *     props.clientId,
 *     {
 *       wrapperDisable: true,
 *     }
 *   );
 * });
 * ```
 */
export const overrideInnerBlockAttributes = (select, clientId, attributesObject = {}, exclude = []) => {
	const { getBlock } = select('core/block-editor');

	const block = getBlock(clientId);

	block.innerBlocks.map((item) => {
		const {
			attributes,
			name,
		} = item;

		if (!exclude.includes(name)) {
			for (const attribute in attributesObject) {
				if (Object.prototype.hasOwnProperty.call(attributesObject, attribute)) {
					if (attribute !== attributes[attribute]) {
						attributes[attribute] = attributesObject[attribute];
					}
				}
			}
		}

		return item;
	});
};

/**
 * Sets attributes on all `innerBlocks`, with Simple wrapper options preset. This value will be stored in the Block editor store and set to a block.
 *
 * @param {function} select State function.
 * @param {string} clientId Unique block ID from block editor.
 * @param {array} exclude Array of block names to exclude.
 *
 * @access public
 *
 * @returns {void}
 *
 * Usage:
 * ```js
 * import { useSelect } from '@wordpress/data';
 *
 * useSelect((select) => {
 *   overrideInnerBlockSimpleWrapperAttributes(
 *     select,
 *     props.clientId
 *   );
 * });
 * ```
 */
export const overrideInnerBlockSimpleWrapperAttributes = (select, clientId, exclude = []) => {
	overrideInnerBlockAttributes(
		select,
		clientId,
		{
			wrapperUseSimple: true,
			wrapperUseSimpleShowControl: false,
			wrapperUseShowControl: false,
		},
		exclude
	);
};

/**
 * Check if attribute exist in attributes list and add default value if not.
 * This is used because Block editor will not output attributes that don't have default value.
 *
 * @param {string} key                       - Key to check.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @access public
 *
 * @return {mixed} Based on the attribute type.
 *                 Boolean - false
 *                 String - ''
 *                 Object - {}
 *                 Array - []
 *
 * Manifest:
 * ```js
 * {
 *  "attributes": {
 *    "buttonUse": {
 *       "type": "boolean"
 *     },
 *   },
*    "buttonContent": {
 *       "type": "string"
 *     },
 *   }
 * }
 * ```
 *
 * Usage:
 * ```js
 * checkAttr('buttonUse', attributes, manifest);
 * checkAttr('buttonContent', attributes, manifest);
 * ```
 *
 * Output:
 * ```js
 * false
 * ''
 * ```
 */
export const checkAttr = (key, attributes, manifest, undefinedAllowed = false) => {

	// Get the correct key for the check in the attributes object.
	const newKey = getAttrKey(key, attributes, manifest);

	// If key exists in the attributes object, just return that key value.
	if (Object.prototype.hasOwnProperty.call(attributes, newKey)) {
		return attributes[newKey];
	}

	// Check current component attributes.
	const manifestKey = manifest.attributes[key];

	// Bailout if key is missing.
	if (typeof manifestKey === 'undefined') {
		if ('blockName' in manifest) {
			throw Error(`${key} key does not exist in the ${manifest.blockName} block manifest. Please check your implementation.`);
		} else {
			throw Error(`${key} key does not exist in the ${manifest.componentName} component manifest. Please check your implementation.`);
		}
	}

	// If undefinedAllowed is true and attribute is missing default just return undefined to be able to unset attribute in block editor.
	if (!Object.prototype.hasOwnProperty.call(manifestKey, 'default') && undefinedAllowed) {
		return undefined;
	}

	// Check type.
	const defaultType = manifestKey.type;

	let defaultValue;

	// Output "default values" if none are defined.
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
};

/**
 * Maps and check attributes for a responsive object using the checkAttr helper.
 *
 * @param {string} keyName                   - Key name to find in responsiveAttributes object.
 * @param {array} attributes                 - Array of attributes.
 * @param {object} manifest                  - Components/blocks manifest.json
 * @param {boolean} [undefinedAllowed=false] - Allowed detection of undefined values.
 *
 * @access public
 *
 * @returns {mixed}
 *
* Manifest:
	* ```js
	* {
	*   "attributes": {
	*     "headingContentSpacingLarge": {
	*       "type": "integer",
	*       "default": 10,
	*     },
	*     "headingContentSpacingDesktop": {
	*       "type": "integer",
	*       "default": 5,
	*     },
	*     "headingContentSpacingTablet": {
	*       "type": "integer",
	*       "default": 3,
	*     },
	*     "headingContentSpacingMobile": {
	*       "type": "integer",
	*       "default": 1,
	*     }
	*   },
	*   "responsiveAttributes": {
	*     "headingContentSpacing": {
	*       "large": "headingContentSpacingLarge",
	*       "desktop": "headingContentSpacingDesktop",
	*       "tablet": "headingContentSpacingTablet",
	*       "mobile": "headingContentSpacingMobile"
	*     }
	*   }
	* }
	* ```
	*
	* Usage:
	* ```js
	* checkAttrResponsive('headingContentSpacing', attributes, manifest);
	* ```
	*
	* Output:
	* ```js
	* [
	*   large: 10,
	*   desktop: 5,
	*   tablet: 3,
	*   mobile: 1,
	* ]
	* ```
	*/
export const checkAttrResponsive = (keyName, attributes, manifest, undefinedAllowed = false) => {
	const output = {};

	// Bailout if missing keys.
	const responsiveAttributes = manifest?.responsiveAttributes;

	if (typeof responsiveAttributes === 'undefined') {
		if (typeof manifest['blockName'] === 'undefined') {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['blockName']} block manifest.`);
		} else {
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['componentName']} component manifest.`);
		}
	}

	// Bailout if attribute keys is missing.
	if (!_.has(responsiveAttributes, keyName)) {
		throw Error(`It looks like you are missing ${keyName} key in your manifest responsiveAttributes object.`);
	}

	// Iterate keys in responsiveAttributes object and use checkAttr helper.
	for (const [key, value] of Object.entries(responsiveAttributes[keyName])) {
		output[key] = checkAttr(value, attributes, manifest, undefinedAllowed);
	}

	return output;
};

/**
 * Check if attributes key has prefix and outputs the correct attribute name.
 *
 * @param {string} key       - Key to check.
 * @param {array} attributes - Array of attributes.
 * @param {object} manifest  - Components/blocks manifest.json
 *
 * @access public
 *
 * @return string
 */
export const getAttrKey = (key, attributes, manifest) => {
	// Just skip if attribute is wrapper.
	if (key.includes('wrapper')) {
		return key;
	}

	// Skip if using this helper in block.
	if (typeof manifest?.blockName !== 'undefined') {
		return key;
	}

	// If missing prefix or prefix is empty return key.
	if (typeof attributes?.prefix === 'undefined' || attributes?.prefix === '') {
		return key;
	}

	// No need to test if this is block or component because on top level block there is no prefix.
	// If there is a prefix, remove the attribute component name prefix and replace it with the new prefix.
	return key.replace(_.camelCase(manifest.componentName), attributes.prefix);
};

/**
 * Output only attributes that are used in the component and remove everything else.
 *
 * @param {string} newName     - *New* key to use to rename attributes.
 * @param {object} attributes  - Attributes from the block/component.
 * @param {object} [manual={}] - Object of attributes to change key and merge to the original output.
 *
 * @access public
 *
 * @returns {object}
 *
 * Manifest:
 * ```js
 * const attributes = {
 *   buttonColor: 'red',
 *   buttonSize: 'big',
 *   buttonIcon: 'blue',
 *   blockName: 'button',
 *   wrapperSize: 'big',
 *   wrapperType: 'normal',
 * };
 * ```
 *
 * Usage:
 * ```js
 * {...props('button', attributes)}
 * ```
 *
 * Output:
 * ```js
 * {
 *   buttonColor: 'red',
 *   buttonSize: 'big',
 *   buttonIcon: 'blue',
 *   blockName: 'button',
 * };
 * ```
 *
 * Additional keys that are passed are defined in the includes array.
 */
export const props = (newName, attributes, manual = {}) => {

	const output = {};

	// Check what attributes we need to includes.
	const includes = [
		'blockName',
		'blockClientId',
		'blockFullName',
		'blockWrapClass',
		'blockClass',
		'blockJsClass',
		'componentJsClass',
		'selectorClass',
		'additionalClass',
		'setAttributes',
		'uniqueWrapperId',
		'options',
		'clientId',
	];

	// Check if in test mode and use different setting.
	const blockName = process.env.NODE_ENV === 'test' ? attributes.blockName.default : attributes.blockName;

	// Populate prefix key for recursive checks of attribute names.
	const prefix = (typeof attributes.prefix === 'undefined') ? _.camelCase(blockName) : attributes['prefix'];

	// Set component prefix.
	if ( prefix === '' ) {
		output['prefix'] = _.camelCase(newName);
	} else {
		output['prefix'] = `${prefix}${_.upperFirst(_.camelCase(newName))}`;
	}

	// Iterate over attributes.
	for (const [key, value] of Object.entries(attributes)) {

		// Includes attributes from iteration.
		if (includes.includes(key)) {
			Object.assign(output, {[key]: value});
			continue;
		}

		// If attribute starts with the prefix key leave it in the object if not remove it.
		if (key.startsWith(output['prefix'])) {
			Object.assign(output, {[key]: value});
		}
	}

	// Check if you have manual object and prepare the attribute keys and merge them with the original attributes for output.
	if (!_.isEmpty(manual)) {
		// Iterate manual attributes.
		for (let [key, value] of Object.entries(manual)) {

			// Includes attributes from iteration.
			if (includes.includes(key)) {
				Object.assign(output, {[key]: value});
				continue;
			}

			// Remove the current component name from the attribute name.
			const newKey = key.replace(`${_.lowerFirst(_.camelCase(newName))}`, '');

			// Remove the old key.
			delete manual[key];

			// // Add new key to the output with prepared attribute name.
			Object.assign(manual, {[`${output['prefix']}${newKey}`]: value});
		}

		// Merge manual and output objects to one.
		Object.assign(output, manual);
	}

	// Return the original attribute for optimization purposes.
	return output;
};
