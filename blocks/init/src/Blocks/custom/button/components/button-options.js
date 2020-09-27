import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';

export const ButtonOptions = ({ attributes, actions }) => {
    const {
        button,
    } = attributes;

    const {
        onChangeButtonUrl,
        onChangeButtonStyleSize,
        onChangeButtonStyleColor,
        onChangeButtonStyleSizeWidth,
        onChangeButtonId,
        onChangeButtonIsAnchor,
    } = actions;

    const buttonObject = (typeof button === 'undefined') || button;

    return (
    <PanelBody title={__('Button Details', 'eightshift-boilerplate')}>

      <ButtonOptionsComponent
        button={buttonObject}
        onChangeUrl={onChangeButtonUrl}
        onChangeStyleSize={onChangeButtonStyleSize}
        onChangeStyleColor={onChangeButtonStyleColor}
        onChangeStyleSizeWidth={onChangeButtonStyleSizeWidth}
        onChangeId={onChangeButtonId}
        onChangeIsAnchor={onChangeButtonIsAnchor}
      />

    </PanelBody>
  );
};
