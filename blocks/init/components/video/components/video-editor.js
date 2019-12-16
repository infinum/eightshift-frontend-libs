import React from 'react'; // eslint-disable-line no-unused-vars

export const VideoEditor = (props) => {
  const {
    blockClass,
    media: {
      url,
    },
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
