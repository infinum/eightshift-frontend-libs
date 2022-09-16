import React from 'react';
import { __ } from '@wordpress/i18n';
import { props, getOptions, checkAttr, getAttrKey, CollapsableComponentUseToggle } from '@eightshift/frontend-libs/scripts';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { IconOptions } from '../../icon/components/icon-options';
import manifest from './../manifest.json';

export const QuoteOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		quoteShowControls = true,

		showQuoteUse = true,
		showLabel = true,
		showExpanderButton = true,

		additionalControls,
	} = attributes;

	if (!quoteShowControls) {
		return null;
	}

	const quoteUse = checkAttr('quoteUse', attributes, manifest);

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={quoteUse}
			onChange={(value) => setAttributes({ [getAttrKey('quoteUse', attributes, manifest)]: value })}
			showUseToggle={showQuoteUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
		>
			{additionalControls}

			<ParagraphOptions
				{...props('paragraph', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={__('Quote text', 'eightshift-frontend-libs')}
				showParagraphUse={false}
				showExpanderButton={false}
			/>

			<ParagraphOptions
				{...props('author', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={__('Author', 'eightshift-frontend-libs')}
			/>

			<IconOptions
				{...props('icon', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>
		</CollapsableComponentUseToggle>
	);
};
