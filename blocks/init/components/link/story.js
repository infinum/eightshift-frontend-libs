import React from 'react';
import manifest from './../../custom/link/manifest.json';

import { LinkEditor } from './components/link-editor';

export default {
  title: 'Components|Link',
};

const defaultProps = {
  blockClass: 'block-link',
  title: 'Link Title',
  url: '',
  styleColor: manifest.attributes.styleColor.default,
  isAnchor: manifest.attributes.isAnchor.default,
};

export const component = () => (
  <LinkEditor
    {...defaultProps}
  />
);

export const colorBlack = () => (
  <LinkEditor
    {...defaultProps}
    styleColor={'black'}
  />
);

export const isAnchor = () => (
  <LinkEditor
    {...defaultProps}
    isAnchor={true}
  />
);
