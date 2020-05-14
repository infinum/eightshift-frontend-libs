import React from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ExampleEditor } from './components/example-editor';
import { ExampleOptions } from './components/example-options';
import { ExampleToolbar } from './components/example-toolbar';

export const Example = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <ExampleOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <BlockControls>
        <ExampleToolbar
          attributes={attributes}
          actions={actions}
        />
      </BlockControls>
      <ExampleEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
