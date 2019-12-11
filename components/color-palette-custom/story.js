import React from 'react'; // eslint-disable-line no-unused-vars
import globalSettings from './../../blocks/init/manifest.json';
import readme from './readme.md';
import { ColorPaletteCustom } from './color-palette-custom';

export default {
  title: 'Options|Color Palette',
  parameters: {
    notes: readme,
  },
};


const defaultProps = {
  label: 'Button Color',
  help: 'Change Button Background color.',
  onChange: '',
  value: 'Button Title',
  colors: [
    globalSettings.colors.primary,
    globalSettings.colors.black,
  ],
};

export const component = () => (
  <ColorPaletteCustom
    {...defaultProps}
  />
);
