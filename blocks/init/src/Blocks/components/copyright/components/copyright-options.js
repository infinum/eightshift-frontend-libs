import React from 'react';
import { __ } from '@wordpress/i18n';
import { Toggle, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const CopyrightOptions = (attributes) => {
	const {
		setAttributes
	} = attributes;

	const copyrightUse = checkAttr('copyrightUse', attributes, manifest);

	return (
		<Toggle
			label={__('Copyright', '%g_textdomain%')}
			checked={copyrightUse}
			onChange={(value) => setAttributes({ [getAttrKey('copyrightUse', attributes, manifest)]: value })}
			reducedBottomSpacing
		/>
	);
};
