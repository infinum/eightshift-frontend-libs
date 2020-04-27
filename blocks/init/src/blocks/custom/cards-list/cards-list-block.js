import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardsListEditor } from './components/cards-list-editor';

export const CardsList = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <CardsListEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
