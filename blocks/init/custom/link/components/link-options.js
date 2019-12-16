import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';

export const LinkOptions = (props) => {
  const {
    attributes: {
      link,
    },
    actions: {
      onChangeLinkUrl,
      onChangeLinkStyleColor,
      onChangeLinkIsAnchor,
    },
  } = props;

  return (
    <PanelBody title={__('Link Details', 'eightshift-boilerplate')}>

      <LinkOptionsComponent
        link={link}
        onChangeUrl={onChangeLinkUrl}
        onChangeStyleColor={onChangeLinkStyleColor}
        onChangeIsAnchor={onChangeLinkIsAnchor}
      />

    </PanelBody>
  );
};
