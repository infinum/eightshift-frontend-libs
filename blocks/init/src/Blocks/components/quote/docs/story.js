import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { QuoteEditor } from '../components/quote-editor';
import { QuoteOptions } from '../components/quote-options';

export default {
	title: 'Components/Quote',
};

const attributes = getExample('quote', manifest);

export const editor = () => (
	<QuoteEditor {...props('quote', attributes)} />
);

export const options = () => (
	<QuoteOptions
		{...props('quote', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);
