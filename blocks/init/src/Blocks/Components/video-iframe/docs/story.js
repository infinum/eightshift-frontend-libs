import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { VideoIframeEditor } from '../components/video-iframe-editor';
import { VideoIframeOptions } from '../components/video-iframe-options';

export default {
  title: 'Components|Video-Iframe',
  parameters: {
    notes: readme,
  },
};

const editorProps = {
  blockClass: 'block-video-iframe',
  id: 'DiItGE3eAyQ',
  url: 'https://www.youtube-nocookie.com/embed/',
  aspectRatio: 'default',
  title: 'Youtube',
};

const optionsProps = {
  id: 'DiItGE3eAyQ',
  aspectRatio: 'default',
  onChangeId: () => {},
  onChangeAspectRatio: () => {},
};

export const component = () => (
  <VideoIframeEditor
    {...editorProps}
  />
);

export const options = () => (
  <VideoIframeOptions
    {...optionsProps}
  />
);
