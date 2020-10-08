import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';

export const ButtonOptions = ({ attributes, actions }) => {
	return (
		<PanelBody title={__('Button Details', 'eightshift-boilerplate')}>

			<ButtonOptionsComponent
				{...attributes}
				{...actions}
			/>

		</PanelBody>
	);
};
