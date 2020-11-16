import React from 'react'; // eslint-disable-line no-unused-vars
import { InnerBlocks } from '@wordpress/block-editor';
import { AccordionEditor as AccordionEditorComponent } from '../../../components/accordion/components/accordion-editor';

export const AccordionEditor = ({ attributes, setAttributes }) => {
	return (
		<AccordionEditorComponent
			{...attributes}
			accordionContent={<InnerBlocks />}
			setAttributes={setAttributes}
		/>
	);
};
