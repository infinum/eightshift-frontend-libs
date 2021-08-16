import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar, checkAttr, getAttrKey, getOption } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ParagraphToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const paragraphAlign = checkAttr('paragraphAlign', attributes, manifest);

	return (
		<AlignmentToolbar
			value={paragraphAlign}
			options={getOption('paragraphAlign', attributes, manifest)}
			label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
			title={manifestTitle}
			onChange={(value) => setAttributes({ [getAttrKey('paragraphAlign', attributes, manifest)]: value })}
		/>
	);
};
