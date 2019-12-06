import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export const ServiceBoxOptions = (props) => {
  const {
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Service Box Details', 'eightshift-boilerplate')}>

      {onChangeMedia &&
        <div className="components-base-control">
          <label className="components-base-control__label" htmlFor="url">{__('Image', 'eightshift-boilerplate')}</label>
          <MediaPlaceholder
            onSelect={onChangeMedia}
            accept={'image/*'}
            allowedTypes={['image']}
          />
          <br />
        </div>
      }
    </PanelBody>
  );
};

