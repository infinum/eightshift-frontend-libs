import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { VideoEditor } from '../../components/video/components/video-editor';
import { VideoOptions } from '../../components/video/components/video-options';

export const Video = (props) => {
  const {
    attributes: {
      blockClass,
      media,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Carousel Image Details', 'eightshift-boilerplate')}>
          <VideoOptions
            media={media}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <VideoEditor
        blockClass={blockClass}
        media={media}
      />
    </Fragment>
  );
};
