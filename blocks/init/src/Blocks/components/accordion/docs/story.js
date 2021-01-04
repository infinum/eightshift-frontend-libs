import React from 'react'; // eslint-disable-line no-unused-vars
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

const props = manifest.example.attributes;

export const editor = () => (
	<AccordionEditor {...props} />
);

export const options = () => (
	<AccordionOptions {...props} />
);


export const isOpen = () => (
	<AccordionEditor
		{...props}
		accordionIsOpen={true}
	/>
);
