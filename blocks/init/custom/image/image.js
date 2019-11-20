import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import { ImageEditor } from '../../components/image/components/image-editor';
import { ImageOptions } from '../../components/image/components/image-options';

export const Image = (props) => {
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
        <ImageOptions
          url={mediaUrl}
          onChangeMedia={actions.onChangeMedia}
        />
      </InspectorControls>
      <ImageEditor
        blockClass={blockClass}
        url={mediaUrl}
      />
    </Fragment>
  );
};
