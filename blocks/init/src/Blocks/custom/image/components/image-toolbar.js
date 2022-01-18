import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, MatrixAlignControl } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const ImageToolbar = ({ attributes, setAttributes }) => {
	const imageAlign = checkAttr('imageAlign', attributes, manifest);

	return (
		<MatrixAlignControl
			label={__('Image position', 'eightshift-boilerplate')}
			value={imageAlign}
			onChange={(value) => setAttributes({ [getAttrKey('imageAlign', attributes, manifest)]: value })}
		/>
	);
};
