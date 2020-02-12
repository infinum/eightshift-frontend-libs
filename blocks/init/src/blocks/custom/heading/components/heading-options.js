import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { HeadingOptions as HeadingOptionsComponent } from '../../../components/heading/components/heading-options';

export const HeadingOptions = (props) => {
  const {
    attributes: {
      heading,
    },
    actions: {
      onChangeHeadingStyleSize,
      onChangeHeadingStyleColor,
    },
  } = props;

  return (
    <PanelBody title={__('Heading Details', 'eightshift-boilerplate')}>

      <HeadingOptionsComponent
        heading={(typeof heading === 'undefined') || heading}
        onChangeStyleColor={onChangeHeadingStyleColor}
        onChangeStyleSize={onChangeHeadingStyleSize}
      />

    </PanelBody>
  );
};
