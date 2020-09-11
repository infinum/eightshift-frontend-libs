import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { VideoIframeOptions } from '../../../Components/video-iframe/components/video-iframe-options';

export const YoutubeOptions = ({ attributes, actions }) => {
  const {
    id,
    aspectRatio,
  } = attributes;

  const {
    onChangeId,
    onChangeAspectRatio,
  } = actions;

  return (
    <PanelBody title={__('YouTube Details', 'eightshift-boilerplate')}>
      
      <VideoIframeOptions
        id={id}
        onChangeId={onChangeId}
        aspectRatio={aspectRatio}
        onChangeAspectRatio={onChangeAspectRatio}
      />

    </PanelBody>
  );
};
