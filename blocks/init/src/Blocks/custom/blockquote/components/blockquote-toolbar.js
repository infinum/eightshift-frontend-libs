import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, AlignmentToolbar, AlignmentToolbarType } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const BlockquoteToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const blockquoteAlign = checkAttr('blockquoteAlign', attributes, manifest);

	return (
		<AlignmentToolbar
			value={blockquoteAlign}
			options={getOption('blockquoteAlign', attributes, manifest)}
			label={sprintf(__('%s align', 'eightshift-frontend-libs'), manifestTitle)}
			onChange={(value) => setAttributes({ [getAttrKey('blockquoteAlign', attributes, manifest)]: value })}
			type={AlignmentToolbarType.HORIZONTAL}
		/>
	);
};
