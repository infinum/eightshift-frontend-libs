import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Dashicon } from '@wordpress/components';

export const VideoOptions = (props) => {
  const {
    onChangeMedia,
    media,
    accept = 'video/*',
    allowedTypes = ['video'],
  } = props;

  return (
    <Fragment>
      <div className="components-base-control">
        <label className="components-base-control__label" htmlFor="url">{__('Video', 'eightshift-boilerplate')}</label>
        {!media.url ?
          <MediaPlaceholder
            onSelect={onChangeMedia}
            accept={accept}
            allowedTypes={allowedTypes}
          /> :
          <Button
            isDefault
            onClick={() => onChangeMedia({})}
          >
            <Dashicon icon="trash" />
            {__('Remove Video', 'eightshift-boilerplate')}
          </Button>
        }
      </div>
    </Fragment>
  );
};
