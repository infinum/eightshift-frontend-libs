import { camelCase, has, isEmpty, lowerFirst, upperFirst } from '@eightshift/ui-components/utilities';

const componentNameCache = new WeakMap();

const getComponentCamelName = (manifest) => {
	let cached = componentNameCache.get(manifest);

	if (cached === undefined) {
		cached = camelCase(manifest.componentName);
		componentNameCache.set(manifest, cached);
	}

	return cached;
};

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
 *       wrapperUse: false,
 *       wrapperNoControls: true,
 *     }
 *   );
 * });
 * ```
 */
export const overrideInnerBlockAttributes = (select, clientId, attributesObject = {}, exclude = []) => {
	const { getBlock } = select('core/block-editor');

	const block = getBlock(clientId);
	const entries = Object.entries(attributesObject);

	block.innerBlocks.forEach((item) => {
		const { attributes, name } = item;

		if (exclude.includes(name)) {
			return;
		}

		for (const [attribute, value] of entries) {
			if (value !== attributes[attribute]) {
				attributes[attribute] = value;
			}
		}
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
			wrapperSimple: true,
			wrapperSimpleShowControl: false,
			wrapperUseShowControl: false,
		},
		exclude,
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

	// Bailout if key is missing — build the tip string lazily, only when we actually throw.
	if (typeof manifestKey === 'undefined') {
		const tipOutput = 'components' in manifest ? ' If you are using additional components, check if you used the correct block/component prefix in your attribute name.' : '';

		if ('blockName' in manifest) {
			throw Error(`${key} key does not exist in the ${manifest.blockName} block manifest. Please check your implementation.${tipOutput}`);
		}

		throw Error(`${key} key does not exist in the ${manifest.componentName} component manifest. Please check your implementation.${tipOutput}`);
	}

	// Single hasOwnProperty check shared across all type branches.
	if (Object.prototype.hasOwnProperty.call(manifestKey, 'default')) {
		return manifestKey.default;
	}

	// No default present — caller may opt in to undefined so block editor can unset the attribute.
	if (undefinedAllowed) {
		return undefined;
	}

	// Fall back to a fresh type-appropriate empty value.
	switch (manifestKey.type) {
		case 'boolean':
			return false;
		case 'array':
			return [];
		case 'object':
			return {};
		default:
			return '';
	}
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
			throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['componentName']} component manifest.`);
		}

		throw Error(`It looks like you are missing responsiveAttributes key in your ${manifest['blockName']} block manifest.`);
	}

	// Bailout if attribute keys is missing.
	if (!has(responsiveAttributes, keyName)) {
		throw Error(`It looks like you are missing ${keyName} key in your manifest responsiveAttributes object.`);
	}

	// Iterate keys in responsiveAttributes object and use checkAttr helper.
	const responsiveKeyAttrs = responsiveAttributes[keyName];

	for (const [key, value] of Object.entries(responsiveKeyAttrs)) {
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
	return key.replace(getComponentCamelName(manifest), attributes.prefix);
};

const PROPS_INCLUDES = new Set(['blockName', 'blockClientId', 'blockTopLevelId', 'blockFullName', 'blockClass', 'blockJsClass', 'componentJsClass', 'selectorClass', 'additionalClass', 'setAttributes', 'uniqueWrapperId', 'options', 'clientId']);

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

	const blockName = attributes.blockName;

	// Populate prefix key for recursive checks of attribute names.
	const prefix = typeof attributes.prefix === 'undefined' ? camelCase(blockName) : attributes['prefix'];

	// Set component prefix.
	const outputPrefix = prefix === '' ? camelCase(newName) : `${prefix}${upperFirst(camelCase(newName))}`;
	output['prefix'] = outputPrefix;

	for (const [key, value] of Object.entries(attributes)) {
		if (PROPS_INCLUDES.has(key)) {
			output[key] = value;
			continue;
		}

		if (key.startsWith(outputPrefix)) {
			output[key] = value;
		}
	}

	if (!isEmpty(manual)) {
		// Loop-invariant — compute once instead of per-key.
		const renamePrefix = lowerFirst(camelCase(newName));

		for (const [key, value] of Object.entries(manual)) {
			if (PROPS_INCLUDES.has(key)) {
				output[key] = value;
				continue;
			}

			// Write the renamed key directly to output instead of mutating the caller's manual object.
			output[`${outputPrefix}${key.replace(renamePrefix, '')}`] = value;
		}
	}

	return output;
};
