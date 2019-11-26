import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { TabsItemContentEditor } from './components/tabs-item-content-editor';
import { TabsItemContentOptions } from './components/tabs-item-content-options';

export const TabsItem = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <TabsItemContentOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <TabsItemContentEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
