import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';

export const ParagraphOptions = (props) => {
  const {
    attributes: {
      styleColor,
      styleSize,
      removeStyle,
    },
    actions: {
      onChangeStyleColor,
      onChangeStyleSize,
    },
  } = props;

  return (
    <PanelBody title={__('Paragraph Details', 'eightshift-boilerplate')}>

      <ParagraphOptionsComponent
        styleSize={styleSize}
        onChangeStyleSize={onChangeStyleSize}
        styleColor={styleColor}
        onChangeStyleColor={onChangeStyleColor}
        removeStyle={removeStyle}
      />

    </PanelBody>
  );
};
