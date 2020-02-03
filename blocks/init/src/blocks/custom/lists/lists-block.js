import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from 'EightshiftBlocksGetActions';
import manifest from './manifest.json';
import { ListsEditor } from './components/lists-editor';

export const Lists = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <ListsEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
