import React from 'react';
import manifest from './manifest.json';

import { Paragraph } from './paragraph';

export default {
  component: Paragraph,
  title: 'Block|Paragraph',
};

const defaultProps = {
  blockClass: 'block-paragraph',
  content: 'Paragraph Content',
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
  removeStyle: manifest.attributes.removeStyle.default,
};

export const blockDefault = () => (
  <Paragraph
    attributes={{
      ...defaultProps
    }}
  />
);

export const alignCenter = () => (
  <Paragraph
    attributes={{
      ...defaultProps,
      styleAlign: 'center',
    }}
  />
);

export const alignRight = () => (
  <Paragraph
    attributes={{
      ...defaultProps,
      styleAlign: 'right',
    }}
  />
);

export const colorBlack = () => (
  <Paragraph
    attributes={{
      ...defaultProps,
      styleColor: 'black',
    }}
  />
);

export const sizeSmall = () => (
  <Paragraph
    attributes={{
      ...defaultProps,
      styleSize: 'small',
    }}
  />
);

export const removeStyle = () => (
  <Paragraph
    attributes={{
      ...defaultProps,
      removeStyle: false,
    }}
  />
);
