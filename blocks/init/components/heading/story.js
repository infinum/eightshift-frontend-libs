import React from 'react';
import manifest from './../../custom/heading/manifest.json';

import { HeadingEditor } from './components/heading-editor';

export default {
  title: 'Components|Heading',
};

const defaultProps = {
  blockClass: 'block-heading',
  content: 'Heading Content',
  level: manifest.attributes.level.default,
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
};

export const component = () => (
  <HeadingEditor
    {...defaultProps}
  />
);

export const sizeBig = () => (
  <HeadingEditor
    {...defaultProps}
    styleSize = {'big'}
  />
);

export const colorBlack = () => (
  <HeadingEditor
    {...defaultProps}
    styleColor = {'black'}
  />
);

export const alignCenter = () => (
  <HeadingEditor
    {...defaultProps}
    styleAlign = {'center'}
  />
);

export const alignRight = () => (
  <HeadingEditor
    {...defaultProps}
    styleAlign = {'right'}
  />
);
