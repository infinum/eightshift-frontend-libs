import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, MatrixAlignControl } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const VideoToolbar = ({ attributes, setAttributes }) => {
	const videoAlign = checkAttr('videoAlign', attributes, manifest);

	return (
		<MatrixAlignControl
			label={__('Video position', 'newboilerplate')}
			value={videoAlign}
			onChange={(value) => setAttributes({ [getAttrKey('videoAlign', attributes, manifest)]: value })}
		/>
	);
};
