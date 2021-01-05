import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';

export const ButtonOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Button Details', 'eightshift-frontend-libs')}>
			<ButtonOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
