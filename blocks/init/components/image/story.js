import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ImageEditor } from './components/image-editor';
import { ImageOptions } from './components/image-options';

export default {
  title: 'Components|Image',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-image',
  media: {
    id: 0,
    url: 'https://picsum.photos/400/400',
    title: 'Image Title',
  },
};

const optionsProps = {
  media: {
    id: 0,
    url: 'https://picsum.photos/400/400',
    title: 'Image Title',
  },
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
