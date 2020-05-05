import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';

export const LinkOptions = ({ attributes, actions }) => {
  const {
    link,
  } = attributes;

  const {
    onChangeLinkUrl,
    onChangeLinkStyleColor,
    onChangeLinkIsAnchor,
  } = actions;

  const linkObject = (typeof link === 'undefined') || link;

  return (
    <PanelBody title={__('Link Details', 'eightshift-boilerplate')}>

      <LinkOptionsComponent
        link={linkObject}
        onChangeUrl={onChangeLinkUrl}
        onChangeStyleColor={onChangeLinkStyleColor}
        onChangeIsAnchor={onChangeLinkIsAnchor}
      />

    </PanelBody>
  );
};
