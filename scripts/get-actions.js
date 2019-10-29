import { ucfirst } from './ucfirst';

/**
 * Crate attributes actions from blocks manifest.json.
 * Actions are passed in child components in order to update props on event.
 * Default function output is `onChange` + attribute name.
 * Example `onChangeContent`.
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
  const { setAttributes } = props || {};
  const { attributes } = manifest || {};

  // Prepare output variable.
  const actionsOutput = {};

  // Iterate all object keys. This is the fastest way.
  for (const key in attributes) {

    // If key doesn't exists skip this iteration.
    if (attributes.hasOwnProperty(key)) {

      // If useManual key is set to true skip this attribute from actions output.
      if (attributes[key].hasOwnProperty('manualAction')) {
        continue;
      }

      // Set output as a object key with anonimus function callback.
      // Keys first name must be uppercased.
      actionsOutput[`onChange${ucfirst(key)}`] = function(value) {
        setAttributes({
          [key]: value,
        });
      };
    }
  }

  return actionsOutput;
};
