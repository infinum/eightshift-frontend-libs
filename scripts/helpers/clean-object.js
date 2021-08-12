/**
 * Helper that cleans the object from null/undefined/empty array or objects.
 *
 * @param {object} object - Object with potential values of null, undefined, empty object or empty array.
 *
 * @returns {object} Object without null/undefined/empty values.
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
