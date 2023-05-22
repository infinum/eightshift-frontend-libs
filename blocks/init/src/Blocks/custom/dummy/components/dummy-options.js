import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const %block-name-pascal-case%Options = () => {
	return (
		<PanelBody title={__('%block-name-title-case%', 'eightshift-frontend-libs')}>
		</PanelBody>
	);
};
