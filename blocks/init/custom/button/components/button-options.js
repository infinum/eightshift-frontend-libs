import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions as ButtonOptionsComponent } from './../../../components/button/components/button-options';

export const ButtonOptions = (props) => {
  const {
    attributes: {
      title,
      url,
      styleSize,
      styleColor,
      styleSizeWidth,
      btnId,
    },
    actions: {
      onChangeUrl,
      onChangeStyleSize,
      onChangeStyleColor,
      onChangeStyleSizeWidth,
      onChangeBtnId,
      onChangeTitle,
    },
  } = props;

  return (
    <PanelBody title={__('Button Details', 'eightshift-boilerplate')}>

      <ButtonOptionsComponent
        url={url}
        onChangeUrl={onChangeUrl}
        styleSize={styleSize}
        onChangeStyleSize={onChangeStyleSize}
        styleColor={styleColor}
        onChangeStyleColor={onChangeStyleColor}
        styleSizeWidth={styleSizeWidth}
        onChangeStyleSizeWidth={onChangeStyleSizeWidth}
        btnId={btnId}
        onChangeBtnId={onChangeBtnId}
        title={title}
        onChangeTitle={onChangeTitle}
      />

    </PanelBody>
  );
};
