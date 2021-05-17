import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { AlignmentToolbar } from '@wordpress/block-editor';
import manifest from './../manifest.json';

export const ListsToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		listsAlign = checkAttr('listsAlign', attributes, manifest),
	} = attributes;

	return (
		<AlignmentToolbar
			value={listsAlign}
			options={manifestOptions.listsAlign}
			label={sprintf(__('%s text align', 'eightshift-frontend-libs'), manifestTitle)}
			onChange={(value) => setAttributes({ 'listsAlign': value })}
		/>
	);
};
