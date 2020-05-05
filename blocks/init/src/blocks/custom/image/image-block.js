import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ImageEditor } from './components/image-editor';

export const Image = (props, { attributes }) => {

  const actions = getActions(props, manifest);

  return (
    <ImageEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
