import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { ServiceBoxEditor } from './components/service-box-editor';
import { ServiceBoxOptions } from './components/service-box-options';

export const ServiceBox = (props) => {

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
        <ServiceBoxOptions
          actions={actions}
        />
      </InspectorControls>
      <ServiceBoxEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
