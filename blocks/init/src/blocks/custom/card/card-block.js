import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardEditor } from './components/card-editor';
import { CardOptions } from './components/card-options';
import './hooks';

export const Card = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <CardOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <CardEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
