import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { ParagraphEditor } from '../components/paragraph-editor';
import { ParagraphOptions, paragraphSizes } from '../components/paragraph-options';
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

export const styleSize = () => (
  <Fragment>
    {paragraphSizes.map((values, index) => (
      <Fragment key={index}>
        <ParagraphEditor
          {...editorProps}
          paragraph={{
            ...editorProps.paragraph,
            content: values.label,
            styleSize: values.value,
          }}
        />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const styleAlign = () => (
  <Fragment>
    {['left', 'center', 'right'].map((values, index) => (
      <Fragment key={index}>
        <ParagraphEditor
          {...editorProps}
          paragraph={{
            ...editorProps.paragraph,
            content: values,
            styleAlign: values,
          }}
        />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const colorBlack = () => (
  <ParagraphEditor
    paragraph={{
      ...editorProps.paragraph,
      styleColor: 'black',
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
