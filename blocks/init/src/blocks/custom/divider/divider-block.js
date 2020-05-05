import React from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { DividerEditor } from './components/divider-editor';
import { DividerOptions } from './components/divider-options';

export const Divider = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <DividerOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <DividerEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
