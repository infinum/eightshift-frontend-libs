import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';
import { Button, Dashicon } from '@wordpress/components';

export const VideoEditor = (props) => {
  const {
    blockClass,
    media: {
      url,
      accept = 'video/*',
      allowedTypes = ['video'],
    },
    onChangeMedia,
  } = props;

  const componentClass = 'video';

  const videoClass = `
    ${componentClass}
    ${blockClass}__video
  `;

  const removeMedia = () => {
    onChangeMedia({});
  };

  return (
    <Fragment>
      {!url ?
        <MediaPlaceholder
          icon="format-image"
          onSelect={onChangeMedia}
          accept={accept}
          allowedTypes={allowedTypes}
        /> :
        <Fragment>
          <Button
            isSecondary
            onClick={removeMedia}
            className={'media-remove'}
          >
            <Dashicon icon="trash" />
          </Button>
          <video className={videoClass} muted>
            <source src={url} type="video/mp4" />
          </video>
        </Fragment>
      }
    </Fragment>
  );
};
