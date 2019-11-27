import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';

export const TabsItemOptions = (props) => {
  const {
    attributes: {
      head,
    },
    actions: {
      onChangeHead,
    },
  } = props;

  return (
    <PanelBody title={__('Tabs Item Details', 'eightshift-boilerplate')}>
      {onChangeHead &&
        <TextControl
          label={__('Head', 'eightshift-boilerplate')}
          value={head}
          onChange={onChangeHead}
        />
      }
    </PanelBody>
  );
};

