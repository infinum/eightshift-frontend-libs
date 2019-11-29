import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/editor';
import { PanelBody } from '@wordpress/components';

export const IntroOptions = (props) => {
  const {
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Intro Details', 'eightshift-boilerplate')}>

      {onChangeMedia &&
        <div>
          <label htmlFor="media">{__('Image', 'eightshift-boilerplate')}</label>
          <MediaPlaceholder
            icon="format-image"
            onSelect={onChangeMedia}
            accept={'image/*'}
            allowedTypes={['image']}
          />
        </div>
      }
    </PanelBody>
  );
};
