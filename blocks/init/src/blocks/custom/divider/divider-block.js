import React from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { getActions } from 'EightshiftBlocksGetActions';
import manifest from './manifest.json';
import { DividerEditor } from './components/divider-editor';
import { DividerOptions } from './components/divider-options';

export const Divider = (props) => {
  const {
    attributes,
  } = props;

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
