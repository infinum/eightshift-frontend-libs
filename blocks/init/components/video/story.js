import React from 'react'; // eslint-disable-line no-unused-vars
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
  media: {
    id: 0,
    url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
    title: 'Video Title',
  },
};

const optionsProps = {
  media: {
    id: 0,
    url: 'https://storage.googleapis.com/coverr-main/mp4%2FIn-The-Clouds.mp4',
    title: 'Video Title',
  },
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
