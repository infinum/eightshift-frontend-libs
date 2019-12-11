import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { ServicesEditor } from './components/services-editor';

export const Services = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <ServicesEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
