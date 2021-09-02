import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, ComponentUseToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const QuoteOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		quoteShowControls = true,

		showQuoteUse = false,
		showLabel = false,
	} = attributes;

	if (!quoteShowControls) {
		return null;
	}

	const quoteUse = checkAttr('quoteUse', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={quoteUse}
				onChange={(value) => setAttributes({ [getAttrKey('quoteUse', attributes, manifest)]: value })}
				showUseToggle={showQuoteUse}
				showLabel={showLabel}
			/>

			{quoteUse &&
				<>
				</>
			}
		</>
	);
};
