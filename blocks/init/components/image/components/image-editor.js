import React from 'react'; // eslint-disable-line no-unused-vars

export const ImageEditor = (props) => {
  const {
    blockClass,
    media,
  } = props;

  const componentClass = 'image';

  const imageClass = `
    ${componentClass}
    ${blockClass}__img
  `;

  return (
    <img className={imageClass} src={media.url} alt={media.title} />
  );
};
