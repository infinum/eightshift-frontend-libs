import React from 'react'; // eslint-disable-line no-unused-vars
import { ImageEditor as ImageEditorComponent } from '../../../components/image/components/image-editor';

export const ImageEditor = (props) => {
  const {
    attributes: {
      blockClass,
      media,
    },
  } = props;

  return (
    <ImageEditorComponent
      blockClass={blockClass}
      media={(typeof media === 'undefined') || media}
    />
  );
};
