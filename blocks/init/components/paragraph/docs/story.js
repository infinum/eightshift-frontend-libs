import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../../custom/paragraph/manifest.json';
import readme from './readme.md';
import { ParagraphEditor } from '../components/paragraph-editor';
import { ParagraphOptions } from '../components/paragraph-options';
import { ParagraphToolbar } from '../components/paragraph-toolbar';

export default {
  title: 'Components|Paragraph',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-paragraph',
  paragraph: {
    content: 'Paragraph Content',
    styleAlign: manifest.attributes.paragraph.default.styleAlign,
    styleColor: manifest.attributes.paragraph.default.styleColor,
    styleSize: manifest.attributes.paragraph.default.styleSize,
    removeStyle: manifest.attributes.paragraph.default.removeStyle,
  },
  onChangeContent: () => {},
};

const optionsProps = {
  paragraph: {
    content: 'Paragraph Content',
    styleColor: manifest.attributes.paragraph.default.styleColor,
    styleSize: manifest.attributes.paragraph.default.styleSize,
    removeStyle: manifest.attributes.paragraph.default.removeStyle,
  },
  onChangeStyleColor: () => {},
  onChangeStyleSize: () => {},
};

const toolbarProps = {
  paragraph: {
    content: 'Paragraph Content',
    styleAlign: manifest.attributes.paragraph.default.styleAlign,
    removeStyle: manifest.attributes.paragraph.default.removeStyle,
  },
  onChangeStyleAlign: () => {},
};

export const component = () => (
  <ParagraphEditor
    {...editorProps}
  />
);

export const options = () => (
  <ParagraphOptions
    {...optionsProps}
  />
);

export const toolbar = () => (
  <ParagraphToolbar
    {...toolbarProps}
  />
);

export const alignCenter = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      styleAlign: 'center',
    }}
  />
);

export const alignRight = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      styleAlign: 'right',
    }}
  />
);

export const colorBlack = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      styleColor: 'black',
    }}
  />
);

export const sizeSmall = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      styleSize: 'small',
    }}
  />
);

export const removeStyle = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      removeStyle: true,
    }}
  />
);
