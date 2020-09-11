import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';

export const ImageEditor = ({ attributes, actions }) => {

  const {
    blockClass,
    media,
  } = attributes;

  const {
    onChangeMedia,
  } = actions;

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <ImageEditorComponent
      blockClass={blockClass}
      media={mediaObject}
      onChangeMedia={onChangeMedia}
    />
  );
};
