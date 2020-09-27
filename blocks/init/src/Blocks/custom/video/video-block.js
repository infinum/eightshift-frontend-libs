import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { VideoEditor } from './components/video-editor';
import { VideoToolbar } from './components/video-toolbar';

export const Video = (props) => {

    const {
        attributes,
    } = props;

    const actions = getActions(props, manifest);

    return (
    <Fragment>
      <BlockControls>
        <VideoToolbar
          attributes={attributes}
          actions={actions}
        />
      </BlockControls>
      <VideoEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
