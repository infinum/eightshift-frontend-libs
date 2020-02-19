import React from 'react'; // eslint-disable-line no-unused-vars
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
    styleAlign: 'left',
    styleColor: 'primary',
    styleSize: 'default',
    removeStyle: false,
  },
  onChangeContent: () => {},
};

const optionsProps = {
  paragraph: {
    content: 'Paragraph Content',
    styleColor: 'primary',
    styleSize: 'default',
    removeStyle: false,
  },
  onChangeStyleColor: () => {},
  onChangeStyleSize: () => {},
};

const toolbarProps = {
  paragraph: {
    content: 'Paragraph Content',
    styleAlign: 'left',
    removeStyle: false,
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
