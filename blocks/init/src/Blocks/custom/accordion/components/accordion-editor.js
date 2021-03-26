import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AccordionEditor as AccordionEditorComponent } from '../../../components/accordion/components/accordion-editor';
import manifest from './../manifest.json';

export const AccordionEditor = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<AccordionEditorComponent
			{...props(attributes, blockName, '', true)}
			accordionContent={<InnerBlocks />}
			setAttributes={setAttributes}
		/>
	);
};
