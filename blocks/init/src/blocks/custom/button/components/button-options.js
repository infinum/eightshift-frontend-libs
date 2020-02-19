import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';

export const ButtonOptions = (props) => {
  const {
    attributes: {
      button,
    },
    actions: {
      onChangeButtonTitle,
      onChangeButtonUrl,
      onChangeButtonStyleSize,
      onChangeButtonStyleColor,
      onChangeButtonStyleSizeWidth,
      onChangeButtonId,
    },
  } = props;

  return (
    <PanelBody title={__('Button Details', 'eightshift-boilerplate')}>

      <ButtonOptionsComponent
        button={(typeof button === 'undefined') || button}
        onChangeTitle={onChangeButtonTitle}
        onChangeUrl={onChangeButtonUrl}
        onChangeStyleSize={onChangeButtonStyleSize}
        onChangeStyleColor={onChangeButtonStyleColor}
        onChangeStyleSizeWidth={onChangeButtonStyleSizeWidth}
        onChangeId={onChangeButtonId}
      />

    </PanelBody>
  );
};
