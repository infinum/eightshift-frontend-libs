import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { YoutubeEditor } from './components/youtube-editor';
import { YoutubeOptions } from './components/youtube-options';

export const Youtube = (props) => {
    const {
        attributes,
    } = props;

    const actions = getActions(props, manifest);

    return (
    <Fragment>
      <InspectorControls>
        <YoutubeOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <YoutubeEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
