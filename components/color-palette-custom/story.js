import React from 'react';

import globalSettings from './../../blocks/init/manifest.json';

import { ColorPaletteCustom } from './color-palette-custom';

export default {
  title: 'Sidebar Components|Color Palette',
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
