import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoEditor as VideoEditorComponent } from '../../../components/video/components/video-editor';

export const VideoEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    media,
  } = attributes;

  const {
    onChangeMedia,
  } = actions;

  return (
    <VideoEditorComponent
      blockClass={blockClass}
      media={(typeof media === 'undefined') || media}
      onChangeMedia={onChangeMedia}
    />
  );
};
