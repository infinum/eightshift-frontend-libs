import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { CardListEditor } from './components/card-list-editor';
import { CardListOptions } from './components/card-list-options';

export const CardList = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <CardListOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <CardListEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
