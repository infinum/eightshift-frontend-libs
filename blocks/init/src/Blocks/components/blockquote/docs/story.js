import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { BlockquoteEditor } from '../components/blockquote-editor';
import { BlockquoteOptions } from '../components/blockquote-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const attributes = getExample('blockquote', manifest);

export const editor = () => (
	<BlockquoteEditor {...props('blockquote', attributes)} />
);

export const options = () => (
	<BlockquoteOptions
		{...props('blockquote', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const size = () => (
	<Fragment>
		{manifest.options.blockquoteSize.map((values, index) => (
			<Fragment key={index}>
				<BlockquoteEditor
					{...props('blockquote', attributes, {
						blockquoteContent: values.label,
						blockquoteSize: values.value,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.blockquoteColor.map((values, index) => (
			<Fragment key={index}>
				<BlockquoteEditor
					{...props('blockquote', attributes, {
						blockquoteContent: values,
						blockquoteColor: values,
					})}
				/>
				<br /><br />
			</Fragment>
		))}
	</Fragment>
);
