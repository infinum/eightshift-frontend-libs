import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';
import { Button, Dashicon } from '@wordpress/components';

export const ImageEditor = (props) => {
  const {
    media: {
      url,
      accept = 'image/*',
      allowedTypes = ['image'],
    },
    blockClass,
    onChangeMedia,
  } = props;

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
            className="media-remove"
          >
            <Dashicon icon="trash" />
          </Button>
          <img className={classnames('image', `${blockClass}__img`)} src={url} alt="" />
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

