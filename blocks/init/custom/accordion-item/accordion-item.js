import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { AccordionItemEditor } from './components/accordion-item-editor';
import { AccordionItemOptions } from './components/accordion-item-options';

export const AccordionItem = (props) => {

  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <AccordionItemOptions />
      </InspectorControls>
      <AccordionItemEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
