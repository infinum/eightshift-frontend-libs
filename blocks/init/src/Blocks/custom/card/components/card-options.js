import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { CardOptions as CardOptionsComponent } from '../../../components/card/components/card-options';
import manifest from './../manifest.json';

export const CardOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Card Details', 'eightshift-frontend-libs')}>

			<CardOptionsComponent
				{...props('card', attributes, {
					setAttributes: setAttributes,
					options: getOptions(attributes, manifest),
				})}
			/>

		</PanelBody>
	);
};
