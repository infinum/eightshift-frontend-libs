import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor } from './../../../components/image/components/image-editor';

export const CarouselImageEditor = ({ attributes, actions }) => {
    const {
        blockClass,
        media,
    } = attributes;

    const {
        onChangeMedia,
    } = actions;

    const mediaObject = (typeof media === 'undefined') || media;

    return (
    <div className={blockClass}>
      <ImageEditor
        blockClass={blockClass}
        media={mediaObject}
        onChangeMedia={onChangeMedia}
      />
    </div>
  );
};
