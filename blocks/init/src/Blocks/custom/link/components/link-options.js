import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { LinkOptions as LinkOptionsComponent } from '../../../components/link/components/link-options';
import manifest from './../manifest.json';

export const LinkOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<PanelBody title={__('Link Details', 'eightshift-frontend-libs')}>
			<LinkOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
