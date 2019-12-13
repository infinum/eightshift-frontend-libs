import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';

export const ParagraphOptions = (props) => {
  const {
    attributes: {
      styleColor,
      styleAlign,
      removeStyle,
    },
    actions: {
      onChangeStyleColor,
      onChangeStyleAlign,
    },
  } = props;

  return (
    <PanelBody title={__('Paragraph Details', 'eightshift-boilerplate')}>

      <ParagraphOptionsComponent
        styleAlign={styleAlign}
        onChangeStyleAlign={onChangeStyleAlign}
        styleColor={styleColor}
        onChangeStyleColor={onChangeStyleColor}
        removeStyle={removeStyle}
      />

    </PanelBody>
  );
};
