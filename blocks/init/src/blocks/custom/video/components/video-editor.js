import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoEditor as VideoEditorComponent } from '../../../components/video/components/video-editor';

export const VideoEditor = (props) => {
  const {
    attributes: {
      blockClass,
      media,
    },
  } = props;

  return (
    <VideoEditorComponent
      blockClass={blockClass}
      media={(typeof media === 'undefined') || media}
    />
  );
};
