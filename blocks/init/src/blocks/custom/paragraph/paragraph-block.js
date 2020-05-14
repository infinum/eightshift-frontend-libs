import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ParagraphEditor } from './components/paragraph-editor';
import { ParagraphOptions } from './components/paragraph-options';
import { ParagraphToolbar } from './components/paragraph-toolbar';

export const Paragraph = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <ParagraphOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <BlockControls>
        <ParagraphToolbar
          attributes={attributes}
          actions={actions}
        />
      </BlockControls>
      <ParagraphEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
