import classnames from 'classnames';

/**
 * Create responsive selectors used for responsive attributes.
 *
 * @param array   items        Array of brakepoints.
 * @param string  selector     Selector for this brakepoint.
 * @param string  parent       Parent block selector.
 * @param boolean use_modifier If false you can use this selector for visibility.
 *
 * @return string
 *
 * Example:
 * Components::responsive_selectors($attributes['width'], 'width', $block_class);
 *
 * Output:
 * block-column__width-large--4
 */
export const responsiveSelectors = (items, selector, parent, useModifier = true) => {
  const output = [];
  
  for (const itemKey in items) {
    if (items.hasOwnProperty(itemKey)) {
      if (items[itemKey] === '') {
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
