import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardEditor } from './components/card-editor';

export const Card = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <CardEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
