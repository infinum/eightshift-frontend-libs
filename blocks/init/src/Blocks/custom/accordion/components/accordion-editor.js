import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { AccordionEditor as AccordionEditorComponent } from '../../../components/accordion/components/accordion-editor';
import manifest from './../manifest.json';

export const AccordionEditor = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
	} = manifest;

	return (
		<AccordionEditorComponent
			{...props(attributes, manifestBlockName, '', true)}
			accordionContent={<InnerBlocks />}
			setAttributes={setAttributes}
		/>
	);
};
