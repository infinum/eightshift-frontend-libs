import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import { VideoEditor } from '../../components/video/components/video-editor';
import { VideoOptions } from '../../components/video/components/video-options';

export const Video = (props) => {
  const {
    setAttributes,
    attributes: {
      blockClass,
      mediaUrl,
    },
  } = props;

  const actions = {
    onChangeMedia: (value) => {
      setAttributes({
        mediaId: value.id,
        mediaUrl: value.url,
      });
    },
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Carousel Image Details', 'eightshift-boilerplate')}>
          <VideoOptions
            url={mediaUrl}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <VideoEditor
        blockClass={blockClass}
        url={mediaUrl}
      />
    </Fragment>
  );
};
