import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { TabsItemHeadEditor } from './components/tabs-item-head-editor';
import { TabsItemHeadOptions } from './components/tabs-item-head-options';

export const TabsItem = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <TabsItemHeadOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <TabsItemHeadEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
