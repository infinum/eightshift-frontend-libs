import React from 'react';
import manifest from './../../custom/paragraph/manifest.json';

import { ParagraphEditor } from './components/paragraph-editor';

export default {
  title: 'Components|Paragraph',
};

const defaultProps = {
  blockClass: 'block-paragraph',
  content: 'Paragraph Content',
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
  removeStyle: manifest.attributes.removeStyle.default,
};

export const component = () => (
  <ParagraphEditor
    {...defaultProps}
  />
);

export const alignCenter = () => (
  <ParagraphEditor
    {...defaultProps}
    styleAlign={'center'}
  />
);

export const alignRight = () => (
  <ParagraphEditor
    {...defaultProps}
    styleAlign={'right'}
  />
);

export const colorBlack = () => (
  <ParagraphEditor
    {...defaultProps}
    styleColor={'black'}
  />
);

export const sizeSmall = () => (
  <ParagraphEditor
    {...defaultProps}
    styleSize={'small'}
  />
);

export const removeStyle = () => (
  <ParagraphEditor
    {...defaultProps}
    removeStyle={true}
  />
);
