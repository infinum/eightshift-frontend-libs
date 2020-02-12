import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { VideoOptions as VideoOptionsComponent } from '../../../components/video/components/video-options';

export const VideoOptions = (props) => {
  const {
    attributes: {
      media,
    },
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Video Details', 'eightshift-boilerplate')}>

      <VideoOptionsComponent
        media={(typeof media === 'undefined') || media}
        onChangeMedia={onChangeMedia}
      />

    </PanelBody>
  );
};
