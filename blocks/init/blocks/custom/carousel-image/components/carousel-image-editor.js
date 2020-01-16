import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor } from './../../../components/image/components/image-editor';

export const CarouselImageEditor = (props) => {
  const {
    attributes: {
      blockClass,
      media,
    },
  } = props;

  return (
    <div className={blockClass}>
      <ImageEditor
        blockClass={blockClass}
        media={media}
      />
    </div>
  );
};
