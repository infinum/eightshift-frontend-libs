import React from 'react';

export const CarouselImageEditor = (props) => {
  const {
    attributes: {
      blockClass,
      mediaUrl,
    },
  } = props;

  const imageClass = `${blockClass}__img`;

  return (
    <div className={blockClass}>
      <img src={mediaUrl} className={imageClass} alt="" />
    </div>
  );
};
