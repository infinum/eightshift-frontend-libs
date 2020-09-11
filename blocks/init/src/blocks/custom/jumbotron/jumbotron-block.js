import React from './node_modules/react'; // eslint-disable-line no-unused-vars
import { Fragment } from './node_modules/@wordpress/element';
import { BlockControls } from './node_modules/@wordpress/block-editor';
import { getActions } from './node_modules/@eightshift/frontend-libs/scripts/editor';
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
