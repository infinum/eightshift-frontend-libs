import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { find } from 'lodash';
import { getColorObjectByColorValue } from '@wordpress/editor';
import { ColorPalette } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

export const ColorPaletteCustom = withSelect((select, ownProps) => {
  const { colors } = select('core/block-editor').getSettings();

  // Allow overrides of editor color pallete for this block.
  if (!ownProps.colors) {
    ownProps.colors = colors;
  }

  return { ...ownProps };
})((props) => {
  const {
    colors,
    value,
    onChange,
    disableCustomColors = true,
    clearable = false,
    label,
    help,
  } = props;

  const [color, setColor] = useState(value);

  const colorValue = find(colors, { name: color });

  const baseClass = 'components-base-control';

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__label`}>{label}</div>
      <ColorPalette
        clearable={clearable}
        colors={colors}
        disableCustomColors={disableCustomColors}
        value={typeof colorValue === 'undefined' ? color : colorValue.color}
        onChange={(newColor) => {
          const colorObject = getColorObjectByColorValue(colors, newColor);

          setColor(() => newColor);

          // For backwards compatibility, we're keeping the ability to set colors with just name.
          // The preferred way is to use a slug.
          let newColorValues = typeof colorObject === 'undefined' ? '' : colorObject.name;
          if (colorObject.slug) {
            newColorValues = colorObject.slug;
          }

          onChange(newColorValues);
        }}
      />
      <p className={`${baseClass}__help`}>{help}</p>
    </div>
  );
});
