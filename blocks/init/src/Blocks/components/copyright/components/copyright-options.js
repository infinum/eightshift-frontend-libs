import React from 'react';
import { __ } from '@wordpress/i18n';
import { Toggle, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const CopyrightOptions = (attributes) => {
	const {
		setAttributes
	} = attributes;

	const copyrightTypographyUse = checkAttr('copyrightTypographyUse', attributes, manifest);

	return (
		<Toggle
			label={__('Copyright', 'eightshift-frontend-libs')}
			checked={copyrightTypographyUse}
			onChange={(value) => setAttributes({ [getAttrKey('copyrightTypographyUse', attributes, manifest)]: value })}
			reducedBottomSpacing
		/>
	);
};
