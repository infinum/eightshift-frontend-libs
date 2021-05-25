import _ from 'lodash';

/**
 * Provides ability to override component options from the parent block/component
 * The components must have the same options name as attribute standard with componentName prefix.
 *
 * @author: Kristijan Marić
 *
 * @param {object} manifest      - *Original* component manifest.
 * @param {string} componentName - Current `componentName`. This changes depending on the passed `componentName`.
 * @param {string} attribute     - Attribute name to check without `componentName` prefix. Value is automatically *camelCased*.
 * @param {object} options       - Options provided by the parent block/component.
 * 
 * @returns {object}
 */
export const getOptions = (manifest = {}, componentName, attribute, options = {}) => {

	let originalKey = `${_.camelCase(manifest.componentName)}${_.startCase(attribute).replace(/\s/g,'')}`;
	let customKey = `${_.camelCase(componentName)}${_.startCase(attribute).replace(/\s/g,'')}`;

	if (!Object.prototype.hasOwnProperty.call(manifest.options, originalKey)) {
		return [];
	}

	// If you have custom name for component.
	if (Object.prototype.hasOwnProperty.call(options, customKey) && !_.isEqual(manifest.options[originalKey], options[customKey])) {

		if (typeof manifest.options[originalKey][0] === 'object') {
			// Used for array of objects (selectControl options).
			return manifest.options[originalKey].filter((item) => options[customKey].includes((item.value)));
		} else {
			// Used for array values (colors, align, etc.).
			return manifest.options[originalKey].filter((item) => options[customKey].includes(item));
		}
	}

	// If you have default name for component.
	return manifest.options[originalKey];
}
