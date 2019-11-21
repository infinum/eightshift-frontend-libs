import React from 'react';
import manifest from './../../custom/lists/manifest.json';

import { ListsEditor } from './components/lists-editor';

export default {
  title: 'Components|Lists',
};

const defaultProps = {
  blockClass: 'block-lists',
  content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
  ordered: manifest.attributes.ordered.default,
};

export const component = () => (
  <ListsEditor
    {...defaultProps}
  />
);

export const ordered = () => (
  <ListsEditor
    {...defaultProps}
    ordered={'ol'}
  />
);
