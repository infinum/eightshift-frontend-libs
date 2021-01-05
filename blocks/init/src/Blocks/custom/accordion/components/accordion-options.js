import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { AccordionOptions as AccordionOptionsComponent } from '../../../components/accordion/components/accordion-options';

export const AccordionOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Accordion Details', 'eightshift-frontend-libs')}>
			<AccordionOptionsComponent
				{...attributes}
				setAttributes={setAttributes}
			/>
		</PanelBody>
	);
};
