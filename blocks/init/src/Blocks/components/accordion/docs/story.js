import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import readme from './readme.md';
import manifest from './../manifest.json';
import { AccordionEditor } from '../components/accordion-editor';
import { AccordionOptions } from '../components/accordion-options';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
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
