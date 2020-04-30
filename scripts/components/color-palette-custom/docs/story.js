import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ColorPaletteCustom } from '../color-palette-custom';
import { getPaletteColors } from './../../../editor/get-palette-colors';

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

export const ColorsFromColorPalette = () => (
  <ColorPaletteCustom
    {...defaultProps}
  />
);

export const SelectedColorsFromColorPalette = () => {

  const {
    primary,
  } = getPaletteColors();

  return (
    <ColorPaletteCustom
      {...defaultProps}
      label={'Selected colors from color palette'}
      colors={[primary]}
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

