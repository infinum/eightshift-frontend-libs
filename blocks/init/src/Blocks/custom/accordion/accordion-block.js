import React from 'react';
import { useSelect } from '@wordpress/data';
import { overrideInnerBlockAttributes } from '@eightshift/frontend-libs/scripts';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionEditor } from './components/accordion-editor';
import { AccordionOptions } from './components/accordion-options';

export const Accordion = (props) => {
	// Set this attributes to all inner blocks once inserted in DOM.
	useSelect((select) => {
		overrideInnerBlockAttributes(
			select,
			props.clientId,
			{
				wrapperUse: false,
				wrapperNoControls: true,
			},
		);
	});

	return (
		<>
			<InspectorControls>
				<AccordionOptions {...props} />
			</InspectorControls>
			<AccordionEditor {...props} />
		</>
	);
};
