import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, Button, Dashicon } from '@wordpress/components';

export const ImageOptions = (props) => {
  const {
    onChangeMedia,
    url,
  } = props;

  const onResetMedia = () => {
    onChangeMedia({});
  };

  return (
    <PanelBody title={__('Image Details', 'eightshift-boilerplate')}>
      <div className="components-base-control">
        <label className="components-base-control__label" htmlFor="url">{__('Image', 'eightshift-boilerplate')}</label>
        {!url ?
          <MediaPlaceholder
            icon="format-image"
            onSelect={onChangeMedia}
            accept={'image/*'}
            allowedTypes={['image', 'application/json']}
          /> :
          <Button
            isDefault
            onClick={onResetMedia}
          >
            <Dashicon icon="trash" />
            {__('Remove Image', 'eightshift-boilerplate')}
          </Button>
        }
      </div>
    </PanelBody>
  );
};
