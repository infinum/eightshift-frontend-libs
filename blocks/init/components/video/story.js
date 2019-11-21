import React from 'react';
import manifest from './../../custom/video/manifest.json';

import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';

export default {
  title: 'Components|Video',
};

const editorProps = {
  blockClass: 'block-video',
  url: manifest.attributes.mediaUrl.default,
};

const optionsProps = {
  url: manifest.attributes.mediaUrl.default,
  onChangeMedia: () => {},
};

export const component = () => (
  <VideoEditor
    {...editorProps}
  />
);

export const options = () => (
  <VideoOptions
    {...optionsProps}
  />
);
