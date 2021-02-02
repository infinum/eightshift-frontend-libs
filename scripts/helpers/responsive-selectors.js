import classnames from 'classnames';

/**
 * Create responsive selectors used for responsive attributes.
 *
 * Example:
 * Components::responsiveSelectors($attributes['width'], 'width', $blockClass);
 *
 * Output:
 * block-column__width-large--4
 *
 * @param {array}   items        Array of breakpoints.
 * @param {string}  selector     Selector for this breakpoint.
 * @param {string}  parent       Parent block selector.
 * @param {boolean} useModifier  If false you can use this selector for visibility.
 *
 * @return string
 */
export const responsiveSelectors = (items, selector, parent, useModifier = true) => {
	const output = [];

	for (const itemKey in items) {
		if (Object.prototype.hasOwnProperty.call(items, itemKey)) {
			if (items[itemKey] === '' || items[itemKey] === false || typeof items[itemKey] === 'undefined') {
				continue;
			}

			if (useModifier) {
				output.push(`${parent}__${selector}-${itemKey}--${items[itemKey]}`);
			} else {
				output.push(`${parent}__${selector}-${itemKey}`);
			}
		}
	}

	return classnames(output);
};
