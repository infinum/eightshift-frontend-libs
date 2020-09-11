import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const VideoIframeEditor = (props) => {
  const {
    id,
    url,
    aspectRatio,
    blockClass,
    title,
  } = props;

  const componentClass = 'video-iframe';

  const videoClass = classnames(
    componentClass,
    `${componentClass}__video-ratio--${aspectRatio}`,
    `${blockClass}__${componentClass}`,
  );

  return (
    <div className={videoClass}>
      <iframe
        className={`${componentClass}__iframe`}
        src={`${url}${id}`}
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
};
