import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import manifest from './../manifest.json';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	const videoAlign = checkAttr('videoAlign', attributes, manifest);

	return (
		<BlockAlignmentMatrixToolbar
			label={__('Video Position', 'project')}
			value={videoAlign}
			onChange={(value) => setAttributes({ [`${manifestBlockName}Align`]: value })}
		/>
	);
};
