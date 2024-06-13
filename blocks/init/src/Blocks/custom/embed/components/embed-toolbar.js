import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, MatrixAlignControl } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const EmbedToolbar = ({ attributes, setAttributes }) => {
	const embedAlign = checkAttr('embedAlign', attributes, manifest);

	return (
		<MatrixAlignControl
			label={__('Embed position', 'safer-internet')}
			value={embedAlign}
			onChange={(value) => setAttributes({ [getAttrKey('embedAlign', attributes, manifest)]: value })}
		/>
	);
};
