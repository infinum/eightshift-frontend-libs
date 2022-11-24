import React from 'react';
import { useSelect } from '@wordpress/data';
import { overrideInnerBlockSimpleWrapperAttributes } from '@eightshift/frontend-libs/scripts';
import { InspectorControls } from '@wordpress/block-editor';
import { AccordionItemEditor } from './components/accordion-item-editor';
import { AccordionItemOptions } from './components/accordion-item-options';

export const AccordionItem = (props) => {
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
				<AccordionItemOptions {...props} />
			</InspectorControls>
			<AccordionItemEditor {...props} />
		</>
	);
};
