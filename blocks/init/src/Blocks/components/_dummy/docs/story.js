import React from 'react';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import { Fragment } from '@wordpress/element';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { %block-name-pascal-case%Editor } from '../components/%block-name-kebab-case%-editor';
import { %block-name-pascal-case%Options } from '../components/%block-name-kebab-case%-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('%block-name-camel-case%', manifest);

export const editor = () => (
	<%block-name-pascal-case%Editor {...props('%block-name-camel-case%', attributes)} />
);

export const options = () => (
	<%block-name-pascal-case%Options
		{...props('%block-name-camel-case%', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const size = () => (
	<Fragment>
		{manifest.options.%block-name-camel-case%Size.map((values, index) => (
			<Fragment key={index}>
				<%block-name-pascal-case%Editor
					{...props('%block-name-camel-case%', attributes, {
						%block-name-camel-case%Content: values.label, 
						%block-name-camel-case%Size: values.value, 
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);

export const color = () => (
	<Fragment>
		{manifest.options.%block-name-camel-case%Color.map((values, index) => (
			<Fragment key={index}>
				<%block-name-pascal-case%Editor
					{...props('%block-name-camel-case%', attributes, {
						%block-name-camel-case%Content: values,
						%block-name-camel-case%Color: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
export const colorWithLink = () => (
	<Fragment>
		{manifest.options.%block-name-camel-case%Color.map((values, index) => (
			<Fragment key={index}>
				<%block-name-pascal-case%Editor
					{...props('%block-name-camel-case%', attributes, {
						%block-name-camel-case%Content: `${values} - Lorem ipsum dolor sit amet, <a href="#">consectetur</a> adipiscing elit.`,
						%block-name-camel-case%Color: values,
					})}
				/>
				<br />
			</Fragment>
		))}
	</Fragment>
);
