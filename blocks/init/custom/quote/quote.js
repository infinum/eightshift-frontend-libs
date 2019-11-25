import React from 'react';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { QuoteEditor } from './components/quote-editor';

export const Quote = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <QuoteEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
