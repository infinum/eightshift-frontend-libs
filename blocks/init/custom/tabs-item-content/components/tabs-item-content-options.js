import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';

export const TabsItemContentOptions = (props) => {
  const {
    attributes: {
      id,
    },
    actions: {
      onChangeId,
    },
  } = props;

  return (
    <PanelBody title={__('Tabs Item Head Details', 'eightshift-boilerplate')}>
      {onChangeId &&
        <TextControl
          label={__('Id', 'eightshift-boilerplate')}
          value={id}
          onChange={onChangeId}
        />
      }
    </PanelBody>
  );
};

