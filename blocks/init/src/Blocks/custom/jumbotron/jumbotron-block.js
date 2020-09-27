import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { JumbotronEditor } from './components/jumbotron-editor';
import { JumbotronToolbar } from './components/jumbotron-toolbar';

export const Jumbotron = (props) => {

    const {
        attributes,
    } = props;

    const actions = getActions(props, manifest);

    return (
    <Fragment>
      <BlockControls>
        <JumbotronToolbar
          attributes={attributes}
          actions={actions}
        />
      </BlockControls>
      <JumbotronEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
