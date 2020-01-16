import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ImageOptions } from '../../../components/image/components/image-options';

export const CardOptions = (props) => {
  const {
    attributes: {
      media,
    },
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Card Details', 'eightshift-boilerplate')}>
      <ImageOptions
        media={media}
        onChangeMedia={onChangeMedia}
      />
    </PanelBody>
  );
};
