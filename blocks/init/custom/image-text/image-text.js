import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { ImageTextEditor } from './components/image-text-editor';
import { ImageTextOptions } from './components/image-text-options';

export const ImageText = (props) => {
  const {
    attributes,
    setAttributes,
  } = props;

  const actions = {
    ...getActions(props, manifest),
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
        <ImageTextOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <ImageTextEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
