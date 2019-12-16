import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../../custom/heading/manifest.json';
import readme from './readme.md';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions } from '../components/heading-options';
import { HeadingToolbar } from '../components/heading-toolbar';

export default {
  title: 'Components|Heading',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-heading',
  content: 'Heading Content',
  onChangeContent: () => {},
  styleAlign: manifest.attributes.styleAlign.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSize: manifest.attributes.styleSize.default,
};

const optionsProps = {
  styleColor: manifest.attributes.styleColor.default,
  onChangeStyleColor: () => {},
  styleSize: manifest.attributes.styleSize.default,
  onChangeStyleSize: () => {},
};

const toolbarProps = {
  level: manifest.attributes.level.default,
  onChangeLevel: () => {},
  styleAlign: manifest.attributes.styleAlign.default,
  onChangeStyleAlign: () => {},
};

export const editor = () => (
  <HeadingEditor
    {...editorProps}
  />
);

export const options = () => (
  <HeadingOptions
    {...optionsProps}
  />
);

export const toolbar = () => (
  <HeadingToolbar
    {...toolbarProps}
  />
);

export const sizeBig = () => (
  <HeadingEditor
    {...editorProps}
    styleSize={'big'}
  />
);

export const colorBlack = () => (
  <HeadingEditor
    {...editorProps}
    styleColor={'black'}
  />
);

export const alignCenter = () => (
  <HeadingEditor
    {...editorProps}
    styleAlign={'center'}
  />
);

export const alignRight = () => (
  <HeadingEditor
    {...editorProps}
    styleAlign={'right'}
  />
);
