import React from 'react';
import manifest from './manifest.json';

import { Video } from './video';

export default {
  component: Video,
  title: 'Block|Video',
};

const defaultProps = {
  blockClass: 'block-video',
  mediaId: '',
  mediaUrl: manifest.attributes.mediaUrl.default,
};

export const blockDefault = () => (
  <Video
    attributes={{
      ...defaultProps
    }}
  />
);
