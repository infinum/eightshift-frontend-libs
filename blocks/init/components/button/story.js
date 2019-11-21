import React from 'react';
import manifest from './../../custom/button/manifest.json';

import { ButtonEditor } from './components/button-editor';
import { ButtonOptions } from './components/button-options';

export default {
  title: 'Components|Button',
};

const editorProps = {
  blockClass: 'block-button',
  title: 'Button Title',
  styleSize: manifest.attributes.styleSize.default,
  styleColor: manifest.attributes.styleColor.default,
  styleSizeWidth: manifest.attributes.styleSizeWidth.default,
};

const optionsProps = {
  title: 'Button Title',
  onChangeTitle: () => {},
  url: 'https://fakeurl.com',
  onChangeUrl: () => {},
  styleSize: manifest.attributes.styleSize.default,
  onChangeStyleSize: () => {},
  styleColor: manifest.attributes.styleColor.default,
  onChangeStyleColor: () => {},
  styleSizeWidth: manifest.attributes.styleSizeWidth.default,
  onChangeStyleSizeWidth: () => {},
  id: 'ID',
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
    {...editorProps}
    styleSize= {'big'}
  />
);

export const colorBlack = () => (
  <ButtonEditor
    {...editorProps}
    styleColor= {'black'}
  />
);

export const sizeWidthBlock = () => (
  <ButtonEditor
    {...editorProps}
    styleSizeWidth= {'block'}
  />
);
