import React from 'react';
import { __ } from '@wordpress/i18n';
import { props, getOptions, UseToggle, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { IconOptions } from '../../icon/components/icon-options';
import manifest from './../manifest.json';

export const QuoteOptions = (attributes) => {
	const {
		additionalControls,
	} = attributes;

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'quoteUse')}>
			{additionalControls}

			<ParagraphOptions
				{...props('paragraph', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={__('Quote text', 'eightshift-frontend-libs')}
				noExpandButton
				noUseToggle
			/>

			<ParagraphOptions
				{...props('author', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={__('Author', 'eightshift-frontend-libs')}
				noExpandButton
			/>

			<IconOptions
				{...props('icon', attributes, {
					options: getOptions(attributes, manifest),
				})}
				noExpandButton
				noBottomSpacing
			/>
		</UseToggle>
	);
};
