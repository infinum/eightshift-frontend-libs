import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ImageEditor } from './components/image-editor';
import { ImageOptions } from './components/image-options';

export const Image = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <ImageOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <ImageEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
