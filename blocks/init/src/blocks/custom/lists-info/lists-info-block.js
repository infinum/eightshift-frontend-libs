import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ListsInfoEditor } from './components/lists-info-editor';

export const ListsInfo = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <ListsInfoEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
