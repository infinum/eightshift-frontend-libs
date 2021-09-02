import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { QuoteEditor } from '../components/quote-editor';
import { QuoteOptions } from '../components/quote-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
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

export const size = () => (
	<Fragment>
		{manifest.options.quoteSize.map((values, index) => (
			<Fragment key={index}>
				<QuoteEditor
					{...props('quote', attributes, {
						quoteContent: values.label,
						quoteSize: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.quoteColor.map((values, index) => (
			<Fragment key={index}>
				<QuoteEditor
					{...props('quote', attributes, {
						quoteContent: values,
						quoteColor: values,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);
