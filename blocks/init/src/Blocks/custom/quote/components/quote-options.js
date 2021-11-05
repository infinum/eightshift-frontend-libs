import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts';
import { QuoteOptions as QuoteOptionsComponent } from '../../../components/quote/components/quote-options';

export const QuoteOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Quote', 'eightshift-frontend-libs')}>
			<QuoteOptionsComponent
				{...props('quote', attributes, {
					setAttributes,
				})}
			/>
		</PanelBody>
	);
};
