import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Dashicon, BaseControl } from '@wordpress/components';

export const ImageOptions = (props) => {
  const {
    onChangeMedia,
    media,
    accept = 'image/*',
    allowedTypes = ['image'],
  } = props;

  return (
    <BaseControl label={__('Image', 'eightshift-boilerplate')}>
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
    </BaseControl>
  );
};
