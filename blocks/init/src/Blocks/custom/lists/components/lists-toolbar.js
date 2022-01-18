import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, AlignmentToolbar } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ListsToolbar = ({ attributes, setAttributes }) => {
	const {
		title: manifestTitle,
	} = manifest;

	const listsAlign = checkAttr('listsAlign', attributes, manifest);

	return (
		<AlignmentToolbar
			value={listsAlign}
			options={getOption('listsAlign', attributes, manifest)}
			label={sprintf(__('%s text align', 'eightshift-boilerplate'), manifestTitle)}
			title={manifestTitle}
			onChange={(value) => setAttributes({ [getAttrKey('listsAlign', attributes, manifest)]: value })}
		/>
	);
};
