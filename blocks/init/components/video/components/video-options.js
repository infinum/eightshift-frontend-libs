import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/editor';
import { PanelBody, Button, Dashicon } from '@wordpress/components';

export const VideoOptions = (props) => {
  const {
    onChangeMedia,
    url,
  } = props;

  const onResetMedia = () => {
    onChangeMedia({});
  };

  return (
    <PanelBody title={__('Video Details', 'eightshift-boilerplate')}>
      <div className="components-base-control">
        <label className="components-base-control__label" htmlFor="url">{__('Video', 'eightshift-boilerplate')}</label>
        {!url ?
          <MediaPlaceholder
            onSelect={onChangeMedia}
            accept={'video/*'}
            allowedTypes={['video']}
          /> :
          <Button
            isDefault
            onClick={onResetMedia}
          >
            <Dashicon icon="trash" />
            {__('Remove Video', 'eightshift-boilerplate')}
          </Button>
        }
      </div>
    </PanelBody>
  );
};
