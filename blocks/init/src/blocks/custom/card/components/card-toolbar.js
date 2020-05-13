import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageToolbar } from '../../../components/image/components/image-toolbar';

export const CardToolbar = ({ attributes, actions }) => {
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
