import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts';
import { AccordionOptions as AccordionOptionsComponent } from '../../../components/accordion/components/accordion-options';

export const AccordionOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Accordion', 'eightshift-frontend-libs')}>
			<AccordionOptionsComponent
				{...props('accordion', attributes, {
					setAttributes,
				})}
			/>
		</PanelBody>
	);
};
