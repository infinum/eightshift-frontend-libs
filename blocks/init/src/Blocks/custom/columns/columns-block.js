/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ColumnsOptions } from './components/columns-options';
import { ColumnsEditor } from './components/columns-editor';

export const Columns = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <ColumnsOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <ColumnsEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
