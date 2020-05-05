import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor } from './../../../components/image/components/image-editor';

export const CarouselImageEditor = (props) => {
  const {
    attributes: {
      blockClass,
      media,
    },
    actions: {
      onChangeMedia,
    },
  } = props;

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
