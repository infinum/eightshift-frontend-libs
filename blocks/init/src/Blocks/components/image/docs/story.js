import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { ImageEditor } from '../components/image-editor';
import { ImageToolbar } from '../components/image-toolbar';

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
  },
  onChangeMedia: () => {},
};


const toolbarProps = {
  media: {
    url: 'https://picsum.photos/400/400',
  },
  onChangeMedia: () => {},
};

export const component = () => (
  <ImageEditor
    {...editorProps}
  />
);

export const toolbar = () => (
  <ImageToolbar
    {...toolbarProps}
  />
);
