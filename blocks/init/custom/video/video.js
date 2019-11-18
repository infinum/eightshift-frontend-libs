import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

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
        <VideoOptions
          url={mediaUrl}
          onChangeMedia={actions.onChangeMedia}
        />
      </InspectorControls>
      <VideoEditor
        blockClass={blockClass}
        url={mediaUrl}
      />
    </Fragment>
  );
};
