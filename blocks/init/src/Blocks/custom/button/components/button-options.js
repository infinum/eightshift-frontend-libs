import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ButtonOptions as ButtonOptionsComponent } from '../../../components/button/components/button-options';
import manifest from './../manifest.json';

export const ButtonOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<PanelBody title={__('Button Details', 'eightshift-frontend-libs')}>

			<ButtonOptionsComponent
				{...props(attributes, manifestBlockName, '', true)}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
