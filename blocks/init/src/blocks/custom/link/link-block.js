import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { getActions } from 'EightshiftBlocksGetActions';
import manifest from './manifest.json';
import { LinkEditor } from './components/link-editor';
import { LinkOptions } from './components/link-options';

export const Link = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <LinkOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <LinkEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
