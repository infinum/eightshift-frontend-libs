import React from 'react';
import manifest from './../../custom/paragraph/manifest.json';

import { ParagraphEditor } from './components/paragraph-editor';

export default {
  title: 'Components|Paragraph',
};

const editorProps = {
  blockClass: 'block-paragraph',
  content: 'Paragraph Content',
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
  removeStyle: manifest.attributes.removeStyle.default,
};

export const component = () => (
  <ParagraphEditor
    {...editorProps}
  />
);

export const alignCenter = () => (
  <ParagraphEditor
    {...editorProps}
    styleAlign={'center'}
  />
);

export const alignRight = () => (
  <ParagraphEditor
    {...editorProps}
    styleAlign={'right'}
  />
);

export const colorBlack = () => (
  <ParagraphEditor
    {...editorProps}
    styleColor={'black'}
  />
);

export const sizeSmall = () => (
  <ParagraphEditor
    {...editorProps}
    styleSize={'small'}
  />
);

export const removeStyle = () => (
  <ParagraphEditor
    {...editorProps}
    removeStyle={true}
  />
);
