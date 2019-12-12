import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Dashicon } from '@wordpress/components';

export const ImageOptions = (props) => {
  const {
    onChangeMedia,
    media,
    accept = 'image/*',
    allowedTypes = ['image'],
  } = props;

  return (
    <Fragment>
      <div className="components-base-control">
        <label className="components-base-control__label" htmlFor="media">{__('Image', 'eightshift-boilerplate')}</label>
        {!media.url ?
          <MediaPlaceholder
            icon="format-image"
            onSelect={onChangeMedia}
            accept={accept}
            allowedTypes={allowedTypes}
          /> :
          <Button
            isDefault
            onClick={() => onChangeMedia({})}
          >
            <Dashicon icon="trash" />
            {__('Remove Image', 'eightshift-boilerplate')}
          </Button>
        }
      </div>
    </Fragment>
  );
};
