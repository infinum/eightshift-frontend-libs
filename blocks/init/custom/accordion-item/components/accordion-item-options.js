import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const AccordionItemOptions = (props) => {
  const {
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Accordion Item Details', 'eightshift-boilerplate')}>

    </PanelBody>
  );
};

