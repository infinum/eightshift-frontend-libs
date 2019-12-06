import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { IntroEditor } from './components/intro-editor';
import { IntroOptions } from './components/intro-options';

export const Intro = (props) => {
  const {
    setAttributes,
    attributes,
  } = props;

  const actions = {
    ...getActions(props, manifest),
    onChangeMedia: (value) => {
      setAttributes({
        mediaId: value.id,
        mediaUrl: value.url,
      });
    },
  };

  return (
    <Fragment>
      <InspectorControls>
        <IntroOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <IntroEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
