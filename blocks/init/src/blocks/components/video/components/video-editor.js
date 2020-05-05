import classnames from 'classnames';
import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';
import { Button, Dashicon } from '@wordpress/components';

export const VideoEditor = ({ blockClass, media, onChangeMedia }) => {
  const {
    url,
    accept = 'video/*',
    allowedTypes = ['video'],
  } = media;

  const removeMedia = () => {
    onChangeMedia({});
  };

  return (
    <Fragment>
      {url ?
        <Fragment>
          <Button
            isSecondary
            onClick={removeMedia}
            className={'media-remove'}
          >
            <Dashicon icon="trash" />
          </Button>
          <video className={classnames('video', `${blockClass}__video`)} muted>
            <source src={url} type="video/mp4" />
          </video>
        </Fragment> :
        <MediaPlaceholder
          icon="format-image"
          onSelect={onChangeMedia}
          accept={accept}
          allowedTypes={allowedTypes}
        />
      }
    </Fragment>
  );
};
