import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { AlignmentToolbar } from '@wordpress/block-editor';
import manifest from './../manifest.json';

export const ParagraphToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const paragraphAlign = checkAttr('paragraphAlign', attributes, manifest);

	return (
		<AlignmentToolbar
			value={paragraphAlign}
			options={manifestOptions.paragraphAlign}
			label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
			onChange={(value) => setAttributes({ [`${manifestBlockName}Align`]: value })}
		/>
	);
};
