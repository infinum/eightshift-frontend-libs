import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, getOptions, props, AlignmentToolbar, AlignmentToolbarType } from '@eightshift/frontend-libs/scripts';
import { QuoteToolbar as QuoteToolbarComponent } from '../../../components/quote/components/quote-toolbar';
import manifest from './../manifest.json';

export const QuoteToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const quoteAlign = checkAttr('quoteAlign', attributes, manifest);

	return (
		<>
			<QuoteToolbarComponent
				{...props('quote', attributes, {
					setAttributes,
					options: getOptions(attributes, manifest),
				})}
			/>

			<AlignmentToolbar
				value={quoteAlign}
				options={getOption('quoteAlign', attributes, manifest)}
				label={sprintf(__('%s align', 'eightshift-frontend-libs'), manifestTitle)}
				onChange={(value) => setAttributes({ [getAttrKey('quoteAlign', attributes, manifest)]: value })}
				type={AlignmentToolbarType.HORIZONTAL}
			/>
		</>
	);
};
