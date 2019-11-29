import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { ServicesGridEditor } from './components/services-grid-editor';

export const ServicesGrid = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <ServicesGridEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
