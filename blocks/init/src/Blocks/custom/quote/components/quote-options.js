import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { checkAttr, getAttrKey, getOption, props, SimpleHorizontalSingleSelect } from '@eightshift/frontend-libs/scripts';
import { QuoteOptions as QuoteOptionsComponent } from '../../../components/quote/components/quote-options';
import manifest from './../manifest.json';

export const QuoteOptions = ({ attributes, setAttributes }) => {
	const quoteAlign = checkAttr('quoteAlign', attributes, manifest);

	return (
		<PanelBody title={__('Quote', 'eightshift-frontend-libs')}>
			<QuoteOptionsComponent
				{...props('quote', attributes, {
					setAttributes,
				})}
				showQuoteUse={false}
				showLabel={false}
				showExpanderButton={false}
				additionalControls={
					<SimpleHorizontalSingleSelect
						value={quoteAlign}
						options={getOption('quoteAlign', attributes, manifest)}
						label={__('Text align', 'eightshift-frontend-libs')}
						onChange={(value) => setAttributes({ [getAttrKey('quoteAlign', attributes, manifest)]: value })}
						border='offset'
						iconOnly
						includeWpBottomSpacing={false}
						additionalClass='es-mb-4!'
					/>
				}
			/>
		</PanelBody>
	);
};
