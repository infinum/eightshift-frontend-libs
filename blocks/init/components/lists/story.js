import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../custom/lists/manifest.json';

import { ListsEditor } from './components/lists-editor';

export default {
  title: 'Components|Lists',
};

const editorProps = {
  blockClass: 'block-lists',
  content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
  ordered: manifest.attributes.ordered.default,
};

export const editor = () => (
  <ListsEditor
    {...editorProps}
  />
);

export const ordered = () => (
  <ListsEditor
    {...editorProps}
    ordered={'ol'}
  />
);
