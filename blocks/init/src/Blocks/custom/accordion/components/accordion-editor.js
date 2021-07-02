import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AccordionEditor as AccordionEditorComponent } from '../../../components/accordion/components/accordion-editor';

export const AccordionEditor = ({ attributes, setAttributes }) => {
	return (
		<AccordionEditorComponent
			{...props(attributes, 'accordion')}
			accordionContent={<InnerBlocks />}
			setAttributes={setAttributes}
		/>
	);
};
