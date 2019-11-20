import React from 'react';

import manifest from './../../custom/button/manifest.json';
import { ButtonEditor } from './components/button-editor';

export default {
  title: 'Components|Button',
};

const defaultProps = {
  blockClass: 'block-button',
  title: 'Button Title',
  styleSize: manifest.attributes.styleSize.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSizeWidth: manifest.attributes.styleSizeWidth.default,
};

export const component = () => (
  <ButtonEditor
  props={{
      ...defaultProps
    }}
  />
);

export const sizeBig = () => (
  <ButtonEditor
    props={{
      ...defaultProps,
      styleSize: 'big',
    }}
  />
);

export const colorBlack = () => (
  <ButtonEditor
    props={{
      ...defaultProps,
      styleColor: 'black',
    }}
  />
);

export const sizeWidthBlock = () => (
  <ButtonEditor
    props={{
      ...defaultProps,
      styleSizeWidth: 'block',
    }}
  />
);
