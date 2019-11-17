import React from 'react';
import manifest from './manifest.json';

import { Lists } from './lists';

export default {
  component: Lists,
  title: 'Block|Lists',
};

const defaultProps = {
  blockClass: 'block-lists',
  content: '<li>List Item 1</li><li>List Item 2</li><li>List Item 3</li>',
  ordered: manifest.attributes.ordered.default,
};

export const blockDefault = () => (
  <Lists
    attributes={{
      ...defaultProps
    }}
  />
);

export const ordered = () => (
  <Lists
    attributes={{
      ...defaultProps,
      ordered: 'ol',
    }}
  />
);
