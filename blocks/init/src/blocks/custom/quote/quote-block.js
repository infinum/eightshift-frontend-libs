import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { QuoteEditor } from './components/quote-editor';

export const Quote = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <QuoteEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
