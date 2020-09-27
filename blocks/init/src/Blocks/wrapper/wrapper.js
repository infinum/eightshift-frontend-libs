/* eslint-disable no-unused-vars */

import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { WrapperEditor } from './components/wrapper-editor';
import { WrapperOptions } from './components/wrapper-options';

export const Wrapper = (props) => {
    const {
        props: {
            attributes,
        },
        children,
    } = props;

    const actions = getActions(props.props, manifest);

    return (
    <Fragment>
      <InspectorControls>
        <WrapperOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>

      <WrapperEditor
        children={children}
        attributes={attributes}
      />
    </Fragment>
  );
};
