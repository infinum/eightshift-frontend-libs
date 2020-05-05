import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';

export const ImageEditor = ({ attributes, actions }) => {

  const { blockClass, media } = attributes; // Could be destructured above, but this is more readable
  const { onChangeMedia } = actions;

  const mediaValue = (typeof media === 'undefined') || media;

  return (
    <ImageEditorComponent
      blockClass={blockClass}
      media={mediaValue}
      onChangeMedia={onChangeMedia}
    />
  );
};
