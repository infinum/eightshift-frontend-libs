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
  content: 'Paragraph Content',
  onChangeContent: () => {},
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
  removeStyle: manifest.attributes.removeStyle.default,
};

const optionsProps = {
  styleColor: manifest.attributes.styleColor.default,
  onChangeStyleColor: () => {},
  styleSize: manifest.attributes.styleSize.default,
  onChangeStyleSize: () => {},
  removeStyle: manifest.attributes.removeStyle.default,
};

const toolbarProps = {
  styleAlign: manifest.attributes.styleAlign.default,
  onChangeStyleAlign: () => {},
  removeStyle: manifest.attributes.removeStyle.default,
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
