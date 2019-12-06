import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';

export const CarouselImageOptions = (props) => {
  const {
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Carousel Image Details', 'eightshift-boilerplate')}>

      {onChangeMedia &&
        <div className="components-base-control">
          <label className="components-base-control__label" htmlFor="url">{__('Image', 'eightshift-boilerplate')}</label>
          <MediaPlaceholder
            icon="format-image"
            onSelect={onChangeMedia}
            accept={'image/*'}
            allowedTypes={['image', 'application/json']}
          />
        </div>
      }
    </PanelBody>
  );
};
