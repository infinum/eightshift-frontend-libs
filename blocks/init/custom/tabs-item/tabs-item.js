import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { TabsItemEditor } from './components/tabs-item-editor';
import { TabsItemOptions } from './components/tabs-item-options';

export const TabsItem = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <TabsItemOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <TabsItemEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
