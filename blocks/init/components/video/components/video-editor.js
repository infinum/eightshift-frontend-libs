import React from 'react';

export const VideoEditor = (props) => {
  const {
    blockClass,
    url,
  } = props;

  const componentClass = 'video';

  const videoClass = `
    ${componentClass}
    ${blockClass}__video
  `;

  return (
    <video className={videoClass} muted>
      <source src={url} type="video/mp4" />
    </video>
  );
};
