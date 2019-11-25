import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const TabsItemOptions = (props) => {
  const {
    actions: {
      onChangeMedia,
    },
  } = props;

  return (
    <PanelBody title={__('Tabs Item Details', 'eightshift-boilerplate')}>

    </PanelBody>
  );
};

