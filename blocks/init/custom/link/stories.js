import React from 'react';
import manifest from './manifest.json';

import { Link } from './link';

export default {
  component: Link,
  title: 'Block|Link',
};

const defaultProps = {
  blockClass: 'block-link',
  title: 'Link Title',
  url: '',
  styleColor: manifest.attributes.styleColor.default,
  isAnchor: manifest.attributes.isAnchor.default,
};

export const blockDefault = () => (
  <Link
    attributes={{
      ...defaultProps
    }}
  />
);

export const colorPrimary = () => (
  <Link
    attributes={{
      ...defaultProps,
      styleColor: 'primary',
    }}
  />
);

export const isAnchor = () => (
  <Link
    attributes={{
      ...defaultProps,
      isAnchor: true,
    }}
  />
);
