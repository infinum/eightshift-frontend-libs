import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/editor';
import { Button, Dashicon, BaseControl } from '@wordpress/components';

export const VideoOptions = (props) => {
  const {
    media: {
      url,
      accept = 'video/*',
      allowedTypes = ['video'],
    },
    onChangeMedia,
  } = props;

  return (
    <BaseControl label={__('Video', 'eightshift-boilerplate')}>
      {!url ?
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
    </BaseControl>
  );
};
