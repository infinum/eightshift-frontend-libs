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

  return (
    <div className={blockClass}>
      <ImageEditor
        blockClass={blockClass}
        media={(typeof media === 'undefined') || media}
        onChangeMedia={onChangeMedia}
      />
    </div>
  );
};
