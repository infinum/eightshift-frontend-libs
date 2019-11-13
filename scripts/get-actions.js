import { ucfirst } from './ucfirst';

/**
 * This method is used when atributes have property type `object` with any number of values, eg. `content`, `url`, `type` etc.
 * This function generates callback for each of the values from attribute. Generate callback with name onChange${attribute_name}${propery_name}
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
 *       },
 *       "multipleProps": true
 *     }
 * }
 * Inside actions there will be `onChangeHeadingColor` where atribute name is `heading` and object property is `color`
 *
 * @param {object} setAttributes Method for saving atributes.
 * @param {object} attributes All atributes from namifest.json
 * @param {string} key Came of the property in manifes.
 * @param {object} propsAttributes Current atributes when this function executes.
 *
 * @since 1.0.5 Ucfirst path hotfix.
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */

const multiplePropsActions = (setAttributes, attributes, key, propsAttributes) => {
  const output = {};

  // Set output as a object key with anonimus function callback.
  for (const propType in attributes[key]) {

    // Create functions for default values.
    if (propType === 'default') {

      for (const propName in attributes[key][propType]) {
        if (attributes[key][propType].hasOwnProperty(propName)) {

          output[`onChange${ucfirst(key)}${ucfirst(propName)}`] = function(value) {
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

  return output;
};

/**
 * This method is used to set atributes with single property.
 * This function generates callback for that propertiy value.
 *
 * @param {object} setAttributes Method for saving atributes.
 * @param {string} key Came of the property in manifes.
 *
 * @since 1.0.5 Ucfirst path hotfix.
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */

const siglePropsAction = (setAttributes, key) => {
  const output = {};

  // Set output as a object key with anonimus function callback.
  // Keys name must be written in uppercase.
  output[`onChange${ucfirst(key)}`] = function(value) {
    setAttributes({
      [key]: value,
    });
  };

  return output;
};

/**
 * This method is used for setting media attributes. It is property type `object` with default values of `id`, `url`, `title`.
 * This function generates callback that saves `id`, `url` and `title` of attribute.
 * 
 * Example: 
 * "attributes": {
 *   "primaryVideo": {
 *     "type": "object",
 *     "default": {
 *       "id": 0,
 *       "url": "",
 *       "title": ""
 *     },
 *     "mediaAction": true
 *   }
 * }
 *
 * Inside actions there will be `onChangePrimaryVideo` function that will update `id`, `url` and `title` and expect that a given object have those properties
 * 
 * @param {object} setAttributes Method for saving atributes.
 * @param {string} key Came of the property in manifest.
 *
 * @since 1.0.5 Ucfirst path hotfix.
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
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
        title: value.title,
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
 * Depending on prope
 *
 * @param {object} props Block props so we can get `setAttributes` method.
 * @param {object} manifest Block manifest.json so we can get all attributes.
 *
 * @since 1.0.5 Ucfirst path hotfix.
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
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
    if (attributes.hasOwnProperty(key)) {

      // If useManual key is set to true skip this attribute from actions output.
      if (attributes[key].hasOwnProperty('manualAction')) {
        continue;
      }

      // Switch between property types default action, multiple props actions and media actions.
      if (attributes[key].hasOwnProperty('multipleProps')) {
        actionsOutput = { ...actionsOutput, ...multiplePropsActions(setAttributes, attributes, key, propsAttributes) };
      } else if (attributes[key].hasOwnProperty('mediaAction')) {
        actionsOutput = { ...actionsOutput, ...mediaPropsAction(setAttributes, key) };
      } else {
        actionsOutput = { ...actionsOutput, ...siglePropsAction(setAttributes, key) };
      }
    }
  }

  return actionsOutput;
};
