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

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <VideoEditorComponent
      blockClass={blockClass}
      media={mediaObject}
      onChangeMedia={onChangeMedia}
    />
  );
};
