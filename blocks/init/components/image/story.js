import React from 'react';
import manifest from './../../custom/image/manifest.json';

import { ImageEditor } from './components/image-editor';

export default {
  title: 'Components|Image',
};

const defaultProps = {
  blockClass: 'block-image',
  mediaId: '',
  url: manifest.attributes.mediaUrl.default,
  mediaSize: manifest.attributes.mediaSize.default,
};

export const component = () => (
  <ImageEditor
    {...defaultProps}
  />
);
