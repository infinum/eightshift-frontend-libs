import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { CardOptions as CardOptionsComponent } from '../../../components/card/components/card-options';
import manifest from './../manifest.json';

export const CardOptions = ({ attributes, setAttributes }) => {
	const {
		blockName,
		options,
	} = manifest;

	return (
		<PanelBody title={__('Card Details', 'eightshift-frontend-libs')}>
			<CardOptionsComponent
				{...props(attributes, blockName, '', true)}
				setAttributes={setAttributes}
				options={options}
			/>
		</PanelBody>
	);
};
