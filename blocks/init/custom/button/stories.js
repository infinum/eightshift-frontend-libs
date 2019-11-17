import React from 'react';
import manifest from './manifest.json';

import { Button } from './button';

export default {
  component: Button,
  title: 'Block|Button',
};


const defaultProps = {
  blockClass: 'block-button',
  title: 'Button Title',
  url: '',
  styleSize: manifest.attributes.styleSize.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSizeWidth: manifest.attributes.styleSizeWidth.default,
  btnId: '',
};

export const blockDefault = () => (
  <Button
    attributes={{
      ...defaultProps
    }}
  />
);

export const sizeBig = () => (
  <Button
    attributes={{
      ...defaultProps,
      styleSize: 'big',
    }}
  />
);

export const colorBlack = () => (
  <Button
    attributes={{
      ...defaultProps,
      styleColor: 'black',
    }}
  />
);

export const sizeWidthBlock = () => (
  <Button
    attributes={{
      ...defaultProps,
      styleSizeWidth: 'block',
    }}
  />
);
