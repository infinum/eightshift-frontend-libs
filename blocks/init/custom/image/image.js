import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
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
        <PanelBody title={__('Image Details', 'eightshift-boilerplate')}>
          <ImageOptions
            url={mediaUrl}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <ImageEditor
        blockClass={blockClass}
        url={mediaUrl}
      />
    </Fragment>
  );
};
