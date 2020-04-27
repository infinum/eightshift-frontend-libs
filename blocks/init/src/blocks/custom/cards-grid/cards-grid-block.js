import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardsGridEditor } from './components/cards-grid-editor';

export const CardsGrid = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <CardsGridEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
