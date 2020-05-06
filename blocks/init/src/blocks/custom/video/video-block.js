import React from 'react'; // eslint-disable-line no-unused-vars
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { VideoEditor } from './components/video-editor';

export const Video = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <VideoEditor
      attributes={attributes}
      actions={actions}
    />
  );
};
