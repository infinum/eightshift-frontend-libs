import { find } from 'lodash';
import { useState } from 'react';
import { getColorObjectByColorValue } from '@wordpress/editor';
import { ColorPalette } from '@wordpress/components';
import { createElement } from '@wordpress/element';

export function ColorPaletteCustom({
  colors,
  value,
  onChange,
  disableCustomColors = true,
  clearable = false,
  label,
  help,
}) {
  const [color, setColor] = useState(value);

  const colorValue = find(colors, { name: color });

  return (
    createElement('div', {
      className: 'components-base-control',
    }, label && createElement('label', {
      htmlFor: 'color-pallete',
      className: 'components-base-control__label',
    }, label), createElement('br', null), createElement(ColorPalette, {
      colors,
      disableCustomColors,
      value: typeof colorValue === 'undefined' ? color : colorValue.color,
      onChange: (newColor) => {
        const colorObject = getColorObjectByColorValue(colors, newColor);
        
        setColor(() => newColor);
        onChange(typeof colorObject === 'undefined' ? '' : colorObject.name);
      },
      clearable,
    }), help && createElement('p', {
      className: 'components-base-control__help',
    }, help))
  );
}

