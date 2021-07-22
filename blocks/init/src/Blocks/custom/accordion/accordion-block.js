import React from 'react';
import { useSelect } from '@wordpress/data';
import { overrideInnerBlockSimpleWrapperAttributes } from '@eightshift/frontend-libs/scripts';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionEditor } from './components/accordion-editor';
import { AccordionOptions } from './components/accordion-options';

export const Accordion = (props) => {
	const {
		clientId,
	} = props;

	// Set this attributes to all inner blocks once inserted in DOM.
	useSelect((select) => {
		overrideInnerBlockSimpleWrapperAttributes(select, clientId);
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
