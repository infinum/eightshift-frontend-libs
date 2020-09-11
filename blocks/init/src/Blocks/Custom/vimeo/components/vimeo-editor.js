import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoIframeEditor } from '../../../components/video-iframe/components/video-iframe-editor';

export const VimeoEditor = ({ attributes }) => {
  const {
    id,
    aspectRatio,
    blockClass,
  } = attributes;

  return (
    <VideoIframeEditor
      id={id}
      url={'https://player.vimeo.com/video/'}
      aspectRatio={aspectRatio}
      blockClass={blockClass}
      title={'Vimeo'}
    />
  );
};
