import React from 'react';
import { Fragment } from '@wordpress/element';

import { getActions } from 'EighshiftBlocksGetActions';
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
