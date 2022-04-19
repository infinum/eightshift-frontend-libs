import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { props } from '@eightshift/frontend-libs/scripts';
import { AccordionEditor as AccordionEditorComponent } from '../../../components/accordion/components/accordion-editor';

export const AccordionEditor = ({ attributes, setAttributes }) => {
	return (
		<AccordionEditorComponent
			{...props('accordion', attributes, {
				setAttributes,
				accordionContent: <InnerBlocks />
			})}
		/>
	);
};
