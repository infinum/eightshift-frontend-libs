import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ParagraphOptions as ParagraphOptionsComponent } from '../../../components/paragraph/components/paragraph-options';

export const ParagraphOptions = (props) => {
  const {
    attributes: {
      paragraph,
    },
    actions: {
      onChangeParagraphStyleColor,
      onChangeParagraphStyleSize,
    },
  } = props;

  return (
    <PanelBody title={__('Paragraph Details', 'eightshift-boilerplate')}>

      <ParagraphOptionsComponent
        paragraph={(typeof paragraph === 'undefined') || paragraph}
        onChangeStyleSize={onChangeParagraphStyleSize}
        onChangeStyleColor={onChangeParagraphStyleColor}
      />

    </PanelBody>
  );
};
