import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { ImageEditor } from '../../components/image/components/image-editor';
import { ImageOptions } from '../../components/image/components/image-options';

export const Image = (props) => {
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
        <PanelBody title={__('Image Details', 'eightshift-boilerplate')}>
          <ImageOptions
            media={media}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <ImageEditor
        blockClass={blockClass}
        media={media}
      />
    </Fragment>
  );
};
