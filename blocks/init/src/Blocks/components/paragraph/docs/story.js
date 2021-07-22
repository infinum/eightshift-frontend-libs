import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import { Fragment } from '@wordpress/element';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { ParagraphEditor } from '../components/paragraph-editor';
import { ParagraphOptions } from '../components/paragraph-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('paragraph', manifest);

export const editor = () => (
	<ParagraphEditor {...props('paragraph', attributes)} />
);

export const options = () => (
	<ParagraphOptions
		{...props('paragraph', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const size = () => (
	<Fragment>
		{manifest.options.paragraphSize.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: values.label, 
						paragraphSize: values.value, 
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.paragraphColor.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: values,
						paragraphColor: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
export const colorWithLink = () => (
	<Fragment>
		{manifest.options.paragraphColor.map((values, index) => (
			<Fragment key={index}>
				<ParagraphEditor
					{...props('paragraph', attributes, {
						paragraphContent: `${values} - Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipiscing elit.`,
						paragraphColor: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
