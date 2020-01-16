import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../../custom/button/manifest.json';
import readme from './readme.md';

import { ButtonEditor } from '../components/button-editor';
import { ButtonOptions } from '../components/button-options';

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
    styleSize: manifest.attributes.button.default.styleSize,
    styleColor: manifest.attributes.button.default.styleColor,
    styleSizeWidth: manifest.attributes.button.default.styleSizeWidth,
  },
};

const optionsProps = {
  button: {
    title: 'Button Title',
    url: 'https://fakeurl.com',
    styleSize: manifest.attributes.button.default.styleSize,
    styleColor: manifest.attributes.button.default.styleColor,
    styleSizeWidth: manifest.attributes.button.default.styleSizeWidth,
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

export const sizeBig = () => (
  <ButtonEditor
    button={{
      ...editorProps.button,
      styleSize: 'big',
    }}
  />
);

export const colorBlack = () => (
  <ButtonEditor
    button={{
      ...editorProps.button,
      styleColor: 'black',
    }}
  />
);

export const sizeWidthBlock = () => (
  <ButtonEditor
    button={{
      ...editorProps.button,
      styleSizeWidth: 'block',
    }}
  />
);
