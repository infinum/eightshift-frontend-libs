import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions } from '../../../Components/button/components/button-options';

export const cardListMediaPosition = [
  { label: __('Left', 'eightshift-boilerplate'), value: 'left' },
  { label: __('Right', 'eightshift-boilerplate'), value: 'right' },
];

export const CardListOptions = ({ attributes, actions }) => {
  const {
    button,
  } = attributes;

  const {
    onChangeButtonUrl,
    onChangeButtonStyleSize,
    onChangeButtonStyleSizeWidth,
    onChangeButtonStyleColor,
    onChangeButtonId,
    onChangeButtonTitle,
  } = actions;

  const buttonObject = (typeof button === 'undefined') || button;

  return (
    <PanelBody title={__('Card List Details', 'eightshift-boilerplate')}>

      <ButtonOptions
        button={buttonObject}
        onChangeUrl={onChangeButtonUrl}
        onChangeStyleSize={onChangeButtonStyleSize}
        onChangeStyleSizeWidth={onChangeButtonStyleSizeWidth}
        onChangeStyleColor={onChangeButtonStyleColor}
        onChangeId={onChangeButtonId}
        onChangeTitle={onChangeButtonTitle}
      />

    </PanelBody>
  );
};
