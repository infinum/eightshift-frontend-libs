import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const ExampleOptions = () => {
	return (
		<PanelBody title={__('Example', '%g_textdomain%')}>
			<span>{__('Add your options here', '%g_textdomain%')}</span>
		</PanelBody>
	);
};
