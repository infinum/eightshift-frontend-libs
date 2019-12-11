import React from 'react'; // eslint-disable-line no-unused-vars
import manifest from './../../custom/video/manifest.json';
import readme from './readme.md';
import { VideoEditor } from './components/video-editor';
import { VideoOptions } from './components/video-options';

export default {
  title: 'Components|Video',
  parameters: {
    notes: readme,
  },
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
