import _ from 'lodash';

/**
 * Provides ability to override component options from the parent block/component
 * The components must have the same options name as attribute standard with componentName prefix.
 *
 * @author: Kristijan Marić <kristijan.maric@infinum.co>
 *
 * @param {object} manifest Original manifest from the component.
 * @param {string} componentName Current componentName. This is changed depending on the passed componentName.
 * @param {string} attribute Attribute name to check without componentName prefix. Value is auto titleCased.
 * @param {object} options Options provide by the parent block/component.
 */
export const getOptions = (manifest = {}, componentName, attribute, options = {}) => {

	let originalKey = `${manifest.componentName}${_.startCase(attribute).replace(/\s/g,'')}`;
	let customKey = `${componentName}${_.startCase(attribute).replace(/\s/g,'')}`;

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
