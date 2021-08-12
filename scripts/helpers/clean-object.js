/**
 * Removes `null`, `undefined` and empty entries from a given object.
 *
 * @param {object} object - Object which may contain `null`, `undefined` or empty values.
 *
 * @returns {object} Object without `null`, `undefined` and empty values.
 */
 export function cleanObject(object) {
  return Object.entries(object).reduce((cleanedObject, [key, value]) => {
    if (!value || !Object.entries(value).length) {
      return cleanedObject;
    }
    return {
      ...cleanedObject,
      [key]: value,
    }
  }, {});
}
