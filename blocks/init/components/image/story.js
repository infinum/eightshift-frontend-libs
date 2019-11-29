import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../custom/image/manifest.json';

import { ImageEditor } from './components/image-editor';
import { ImageOptions } from './components/image-options';

export default {
  title: 'Components|Image',
};

const editorProps = {
  blockClass: 'block-image',
  url: manifest.attributes.mediaUrl.default,
};

const optionsProps = {
  url: manifest.attributes.mediaUrl.default,
  onChangeMedia: () => {},
};

export const component = () => (
  <ImageEditor
    {...editorProps}
  />
);

export const options = () => (
  <ImageOptions
    {...optionsProps}
  />
);
