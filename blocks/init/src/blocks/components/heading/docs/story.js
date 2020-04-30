import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { HeadingEditor } from '../components/heading-editor';
import { HeadingOptions, headingSizes } from '../components/heading-options';
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

export const styleSize = () => (
  <Fragment>
    {headingSizes.map((values, index) => (
      <Fragment key={index}>
        <HeadingEditor
          {...editorProps}
          content={values.label}
          styleSize={values.value}
        />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const level = () => (
  <Fragment>
    {Array.from({ length: 6 }, (x, i) => i + 1).map((values, index) => (
      <Fragment key={index}>
        <HeadingEditor
          {...editorProps}
          content={`H - ${values.toString()}`}
          level={values}
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
        <HeadingEditor
          {...editorProps}
          content={values}
          styleAlign={values}
        />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const colorBlack = () => (
  <HeadingEditor
    heading={{
      ...editorProps.heading,
      styleColor: 'black',
    }}
  />
);
