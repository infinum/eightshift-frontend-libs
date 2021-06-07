import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AccordionOptions as AccordionOptionsComponent } from '../../../components/accordion/components/accordion-options';
import manifest from './../manifest.json';

export const AccordionOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<PanelBody title={__('Accordion Details', 'eightshift-frontend-libs')}>

			<AccordionOptionsComponent
				{...props(attributes, manifestBlockName, '', true)}
				setAttributes={setAttributes}
			/>

		</PanelBody>
	);
};
