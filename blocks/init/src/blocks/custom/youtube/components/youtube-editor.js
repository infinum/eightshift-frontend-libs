import React from 'react'; // eslint-disable-line no-unused-vars
import { VideoIframeEditor } from '../../../components/video-iframe/components/video-iframe-editor';

export const YoutubeEditor = ({ attributes }) => {
  const {
    id,
    aspectRatio,
    blockClass,
  } = attributes;

  return (
    <VideoIframeEditor
      id={id}
      url={'https://www.youtube-nocookie.com/embed/'}
      aspectRatio={aspectRatio}
      blockClass={blockClass}
      title={'Youtube'}
    />
  );
};
