import React from 'react';
import manifest from './../../custom/video/manifest.json';

import { VideoEditor } from './components/video-editor';

export default {
  title: 'Components|Video',
};

const defaultProps = {
  blockClass: 'block-video',
  mediaId: '',
  url: manifest.attributes.mediaUrl.default,
};

export const component = () => (
  <VideoEditor
    {...defaultProps}
  />
);
