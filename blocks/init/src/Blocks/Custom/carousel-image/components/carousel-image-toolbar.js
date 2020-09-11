import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageToolbar } from '../../../Components/image/components/image-toolbar';

export const CarouselImageToolbar = ({ attributes, actions }) => {
  const {
    media,
  } = attributes;

  const {
    onChangeMedia,
  } = actions;

  const mediaObject = (typeof media === 'undefined') || media;

  return (
    <ImageToolbar
      media={mediaObject}
      onChangeMedia={onChangeMedia}
    />
  );
};
