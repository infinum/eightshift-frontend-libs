import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, AlignmentToolbar, AlignmentToolbarType } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const QuoteToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const quoteAlign = checkAttr('quoteAlign', attributes, manifest);

	return (
		<AlignmentToolbar
			value={quoteAlign}
			options={getOption('quoteAlign', attributes, manifest)}
			label={sprintf(__('%s align', 'eightshift-frontend-libs'), manifestTitle)}
			onChange={(value) => setAttributes({ [getAttrKey('quoteAlign', attributes, manifest)]: value })}
			type={AlignmentToolbarType.HORIZONTAL}
		/>
	);
};
