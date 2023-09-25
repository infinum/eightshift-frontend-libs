import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const ExampleOptions = () => {
	return (
		<PanelBody title={__('Example', 'eightshift-frontend-libs')}>
			<span>{__('Add your options here', 'eightshift-frontend-libs')}</span>
		</PanelBody>
	);
};
