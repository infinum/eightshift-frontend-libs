import React from 'react';
import manifest from './manifest.json';

import { Image } from './image';

export default {
  component: Image,
  title: 'Block|Image',
};

const defaultProps = {
  blockClass: 'block-image',
  mediaId: '',
  mediaUrl: manifest.attributes.mediaUrl.default,
  mediaSize: manifest.attributes.mediaSize.default,
};

export const blockDefault = () => (
  <Image
    attributes={{
      ...defaultProps
    }}
  />
);
