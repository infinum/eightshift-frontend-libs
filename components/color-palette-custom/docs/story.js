import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ColorPaletteCustom } from '../color-palette-custom';
import { getPalleteColors } from './../../../scripts/get-pallete-colors';

export default {
  title: 'Options|Color Palette',
  parameters: {
    notes: readme,
  },
};

const defaultProps = {
  label: 'Color Selector',
  help: 'Change color.',
  onChange: () => {},
  value: 'Color',
};

export const ColorsFromColorPallete = () => (
  <ColorPaletteCustom
    {...defaultProps}
  />
);

export const SelectedColorsFromColorPallete = () => {

  const {
    'cyan-bluish-gray': cyanBluishGray,
  } = getPalleteColors();

  return (
    <ColorPaletteCustom
      {...defaultProps}
      label={'Selected colors from color pallete'}
      colors={[cyanBluishGray]}
    />

  );
};

export const CustomSpecificColor = () => {
  const specificColor = {
    name: 'Specific',
    slug: 'specific',
    color: '#FF11BB',
  };

  return (
    <ColorPaletteCustom
      {...defaultProps}
      label={'Custom specific color'}
      colors={[specificColor]}
    />
  );
};

