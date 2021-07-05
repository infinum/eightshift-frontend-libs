import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts/helpers';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import manifest from './../manifest.json';

export const ImageToolbar = ({ attributes, setAttributes }) => {
	const imageAlign = checkAttr('imageAlign', attributes, manifest);

	return (
		<BlockAlignmentMatrixToolbar
			label={__('Image Position', 'eightshift-frontend-libs')}
			value={imageAlign}
			onChange={(value) => setAttributes({ [getAttrKey('imageAlign', attributes, manifest)]: value })}
		/>
	);
};
