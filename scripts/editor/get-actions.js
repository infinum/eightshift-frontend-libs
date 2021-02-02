import { ucfirst } from './ucfirst';

/**
 * This method is used when attributes have property type `object` with any number of values, eg. `content`, `url`, `type` etc.
 * This function generates callback for each of the values from attribute. Generate callback with name onChange${attribute_name}${property_name}
 *
 * Example:
 * "attributes": {
 *    "heading": {
 *       "type": "object",
 *       "default": {
 *         "content": "",
 *         "color": "default",
 *         "size": "default",
 *         "type": "default",
 *         "weight": "normal",
 *         "family": "a1-serif"
 *       }
 *     }
 * }
 * Inside actions there will be `onChangeHeadingColor` where attribute name is `heading` and object property is `color`
 *
 * @param {function} setAttributes Method for saving attribute.
 * @param {object} attributes All attribute from manifest.json
 * @param {string} key Came of the property in manifest.
 * @param {object} propsAttributes Current attribute when this function executes.
 *
 */

const multiplePropsActions = (setAttributes, attributes, key, propsAttributes) => {
	const output = {};

	// Set output as a object key with anonymous function callback.
	for (const propType in attributes[key]) {
		if (Object.prototype.hasOwnProperty.call(attributes[key], propType)) {

			// Create functions for default values.
			if (propType === 'default') {

				for (const propName in attributes[key][propType]) {
					if (Object.prototype.hasOwnProperty.call(attributes[key][propType], propName)) {

						output[`onChange${ucfirst(key)}${ucfirst(propName)}`] = function (value) {
							setAttributes({
								[key]: {
									...propsAttributes[key],
									[propName]: value,
								},
							});
						};

					}
				}
			}
		}
	}

	return output;
};

/**
 * This method is used to set attributes with single property.
 * This function generates callback for that property value.
 *
 * @param {function} setAttributes Method for saving attributes.
 * @param {string} key Came of the property in manifest.
 *
 */

const singlePropsAction = (setAttributes, key) => {
	const output = {};

	// Set output as a object key with anonymous function callback.
	// Keys name must be written in uppercase.
	output[`onChange${ucfirst(key)}`] = function (value) {
		setAttributes({
			[key]: value,
		});
	};

	return output;
};

/**
 * This method is used for setting media attributes. It is property type `object` with default values of `id`, `url`.
 * This function generates callback that saves `id`, `url` of attribute.
 *
 * Example:
 * "attributes": {
 *   "media": {
 *     "type": "object",
 *     "default": {
 *       "id": 0,
 *       "url": "",
 *     },
 *     "mediaAction": true
 *   }
 * }
 *
 * Inside actions there will be `onChangeMedia` function that will update `id` and `url` expect that a given object have those properties
 *
 * @param {function} setAttributes Method for saving attributes.
 * @param {string} key Came of the property in manifest.
 *
 */

const mediaPropsAction = (setAttributes, key) => {
	const output = {};

	// Set output as an object key with anonymous function callback.
	// Keys name must be written in uppercase.
	output[`onChange${ucfirst(key)}`] = function(value) {
		setAttributes({
			[key]: {
				id: value.id,
				url: value.url,
			},
		});
	};

	return output;
};


/**
 * Create attributes actions from blocks manifest.json.
 *
 * Actions are passed in child components in order to update props on event.
 * Default function output is `onChange` + attribute name.
 * Example `onChangeContent`.
 * Depending on prop
 *
 * @param {object} props Block props so we can get `setAttributes` method.
 * @param {object} manifest Block manifest.json so we can get all attributes.
 *
 */
export const getActions = (props, manifest) => {

	// Get data, if not available set to default.
	const { setAttributes, attributes: propsAttributes } = props || {};
	const { attributes } = manifest || {};

	// Prepare output variable.
	let actionsOutput = {};

	// Iterate all object keys. This is the fastest way.
	for (const key in attributes) {

		// If key doesn't exists skip this iteration.
		if (Object.prototype.hasOwnProperty.call(attributes, key)) {

			// If useManual key is set to true skip this attribute from actions output.
			if (Object.prototype.hasOwnProperty.call(attributes[key], 'manualAction')) {
				continue;
			}

			// Switch between property types default action, multiple props actions and media actions.
			if (Object.prototype.hasOwnProperty.call(attributes[key], 'type') && attributes[key].type === 'object') {

				actionsOutput = {
					...actionsOutput,
					...multiplePropsActions(setAttributes, attributes, key, propsAttributes),
					...singlePropsAction(setAttributes, key),
				};

				if (Object.prototype.hasOwnProperty.call(attributes[key], 'mediaAction')) {
					actionsOutput = {
						...actionsOutput,
						...mediaPropsAction(setAttributes, key),
					};
				}
			} else {
				actionsOutput = {
					...actionsOutput,
					...singlePropsAction(setAttributes, key),
				};
			}
		}
	}

	return actionsOutput;
};
