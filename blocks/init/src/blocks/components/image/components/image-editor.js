import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/editor';
import { Button, Dashicon } from '@wordpress/components';

export const ImageEditor = (props) => {
  const {
    blockClass,
    media: {
      url,
      accept = 'image/*',
      allowedTypes = ['image'],
    },
    onChangeMedia,
  } = props;

  const componentClass = 'image';

  const imageClass = `
    ${componentClass}
    ${blockClass}__img
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
          <img className={imageClass} src={url} alt="" />
        </Fragment>
      }
    </Fragment>
  );
};
