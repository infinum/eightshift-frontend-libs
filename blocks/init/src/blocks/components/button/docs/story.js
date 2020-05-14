import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions, buttonSizes, buttonSizeWidths, buttonColors } from '../components/button-options';

export default {
  title: 'Components|Button',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-button',
  button: {
    title: 'Button Title',
    styleSize: 'default',
    styleColor: 'primary',
    styleSizeWidth: 'default',
  },
};

const optionsProps = {
  button: {
    title: 'Button Title',
    url: 'https://fakeurl.com',
    styleSize: 'default',
    styleColor: 'primary',
    styleSizeWidth: 'default',
    id: 'ID',
  },
  onChangeTitle: () => {},
  onChangeUrl: () => {},
  onChangeStyleSize: () => {},
  onChangeStyleColor: () => {},
  onChangeStyleSizeWidth: () => {},
  onChangeId: () => {},
};

export const editor = () => (
  <ButtonEditor
    {...editorProps}
  />
);

export const options = () => (
  <ButtonOptions
    {...optionsProps}
  />
);

export const styleSize = () => (
  <Fragment>
    {buttonSizes.map((values, index) => (
      <Fragment key={index}>
        <ButtonEditor
          {...editorProps}
          button={{
            ...editorProps.button,
            title: values.label,
            styleSize: values.value,
          }}
        />
        <br />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const styleWidth = () => (
  <Fragment>
    {buttonSizeWidths.map((values, index) => (
      <Fragment key={index}>
        <ButtonEditor
          {...editorProps}
          button={{
            ...editorProps.button,
            title: values.label,
            styleSizeWidth: values.value,
          }}
        />
        <br />
        <br />
      </Fragment>
    ))}
  </Fragment>
);

export const styleColor = () => (
  <Fragment>
    {buttonColors().map((values, index) => (
      <Fragment key={index}>
        <ButtonEditor
          {...editorProps}
          button={{
            ...editorProps.button,
            title: values.name,
            styleColor: values.slug,
          }}
        />
        <br />
        <br />
      </Fragment>
    ))}
  </Fragment>
);
