import React from 'react';
import manifest from './manifest.json';

import { Heading } from './heading';

export default {
  component: Heading,
  title: 'Block|Heading',
};

const defaultProps = {
  blockClass: 'block-heading',
  content: 'Heading Content',
  level: manifest.attributes.level.default,
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
};

export const blockDefault = () => (
  <Heading
    attributes={{
      ...defaultProps
    }}
  />
);

export const sizeBig = () => (
  <Heading
    attributes={{
      ...defaultProps,
      styleSize: 'big',
    }}
  />
);

export const colorPrimary = () => (
  <Heading
    attributes={{
      ...defaultProps,
      styleColor: 'primary',
    }}
  />
);

export const alignCenter = () => (
  <Heading
    attributes={{
      ...defaultProps,
      styleAlign: 'center',
    }}
  />
);

export const alignRight = () => (
  <Heading
    attributes={{
      ...defaultProps,
      styleAlign: 'right',
    }}
  />
);
