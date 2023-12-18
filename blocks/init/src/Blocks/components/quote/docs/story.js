import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { QuoteEditor } from '../components/quote-editor';
import { QuoteOptions } from '../components/quote-options';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Quote',
};

const attributes = getExample('quote', manifest);

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<QuoteEditor {...props('quote', attributes)} />
	</GetStoryComponentDescription>
);

export const options = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<QuoteOptions
			{...props('quote', attributes, {
				options: getOptions(attributes, manifest),
			})}
		/>
	</GetStoryComponentDescription>
);
