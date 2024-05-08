import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, OptionSelector } from '@eightshift/frontend-libs/scripts';
import { QuoteOptions as QuoteOptionsComponent } from '../../../components/quote/components/quote-options';
import manifest from './../manifest.json';

export const QuoteOptions = ({ attributes, setAttributes }) => {
	const quoteAlign = checkAttr('quoteAlign', attributes, manifest);

	return (
		<PanelBody title={__('Quote', '%g_textdomain%')}>
			<QuoteOptionsComponent
				{...props('quote', attributes, {
					setAttributes,
				})}
				additionalControls={
					<OptionSelector
						value={quoteAlign}
						options={getOption('quoteAlign', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('quoteAlign', attributes, manifest)]: value })}
						iconOnly
					/>
				}
				noExpandButton
				noUseToggle
				noLabel
			/>
		</PanelBody>
	);
};
