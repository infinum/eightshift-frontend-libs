import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ImageOptions as ImageOptionsComponent } from '../../../components/image/components/image-options';

export const ImageOptions = (props) => {
  const {
    attributes: {
      media,
    },
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Image Details', 'eightshift-boilerplate')}>

      <ImageOptionsComponent
        media={media}
        onChangeMedia={onChangeMedia}
      />

    </PanelBody>
  );
};
