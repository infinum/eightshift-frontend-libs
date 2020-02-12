import React from 'react'; // eslint-disable-line no-unused-vars
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
  heading: {
    content: 'Heading Content',
    styleAlign: 'left',
    styleColor: 'primary',
    styleSize: 'default',
  },
  onChangeContent: () => {},
};

const optionsProps = {
  heading: {
    styleColor: 'primary',
    styleSize: 'default',
  },
  onChangeStyleColor: () => {},
  onChangeStyleSize: () => {},
};

const toolbarProps = {
  heading: {
    level: 2,
    styleAlign: 'left',
  },
  onChangeLevel: () => {},
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
    heading={{
      ...editorProps.heading,
      styleSize: 'big',
    }}
  />
);

export const colorBlack = () => (
  <HeadingEditor
    heading={{
      ...editorProps.heading,
      styleColor: 'black',
    }}
  />
);

export const alignCenter = () => (
  <HeadingEditor
    heading={{
      ...editorProps.heading,
      styleAlign: 'center',
    }}
  />
);

export const alignRight = () => (
  <HeadingEditor
    heading={{
      ...editorProps.heading,
      styleAlign: 'right',
    }}
  />
);
