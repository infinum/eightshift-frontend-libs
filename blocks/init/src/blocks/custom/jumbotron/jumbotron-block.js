import React from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { JumbotronEditor } from './components/jumbotron-editor';
import { JumbotronOptions } from './components/jumbotron-options';

export const Jumbotron = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <JumbotronOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <JumbotronEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
