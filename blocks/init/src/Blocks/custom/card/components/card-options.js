import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { CardOptions as CardOptionsComponent } from '../../../components/card/components/card-options';
import { options } from './../manifest.json';

export const CardOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Card Details', 'eightshift-frontend-libs')}>
			<CardOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>
		</PanelBody>
	);
};
