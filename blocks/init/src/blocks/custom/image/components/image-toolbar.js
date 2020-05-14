import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageToolbar as ImageToolbarComponent } from '../../../components/image/components/image-toolbar';

export const ImageToolbar = ({ attributes, actions }) => {

  const {
    media,
  } = attributes;

  const {
    onChangeMedia,
  } = actions;

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <ImageToolbarComponent
      media={mediaObject}
      onChangeMedia={onChangeMedia}
    />
  );
};
