import React from 'react';
import { getExample, getOptions, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { AccordionEditor } from '../components/accordion-editor';
import { AccordionOptions } from '../components/accordion-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('accordion', manifest);

export const editor = () => (
	<AccordionEditor {...props('accordion', attributes)} />
);

export const options = () => (
	<AccordionOptions
		{...props('accordion', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);


export const isOpen = () => (
	<AccordionEditor
		{...props('accordion', attributes, {
			accordionIsOpen: true,
		})}
	/>
);
