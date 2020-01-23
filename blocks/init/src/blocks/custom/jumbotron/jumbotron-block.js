import React from 'react'; // eslint-disable-line no-unused-vars
import { InspectorControls } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { getActions } from 'EightshiftBlocksGetActions';
import manifest from './manifest.json';
import { JumbotronEditor } from './components/jumbotron-editor';
import { JumbotronOptions } from './components/jumbotron-options';

export const Jumbotron = (props) => {
  const {
    attributes,
  } = props;

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
