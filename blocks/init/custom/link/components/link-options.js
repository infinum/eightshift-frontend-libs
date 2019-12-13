import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';

export const LinkOptions = (props) => {
  const {
    attributes: {
      url,
      styleColor,
      isAnchor,
    },
    actions: {
      onChangeUrl,
      onChangeStyleColor,
      onChangeIsAnchor,
    },
  } = props;

  return (
    <PanelBody title={__('Link Details', 'eightshift-boilerplate')}>

      <LinkOptionsComponent
        url={url}
        onChangeUrl={onChangeUrl}
        styleColor={styleColor}
        onChangeStyleColor={onChangeStyleColor}
        isAnchor={isAnchor}
        onChangeIsAnchor={onChangeIsAnchor}
      />

    </PanelBody>
  );
};
