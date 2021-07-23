import React from 'react';
import { Fragment } from '@wordpress/element';
import { getExample, props, getOptions } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { IconEditor } from '../components/icon-editor';
import { IconOptions } from '../components/icon-options';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const attributes = getExample('icon', manifest);

export const editor = () => (
	<IconEditor {...props('icon', attributes)} />
);

export const options = () => (
	<IconOptions
		{...props('icon', attributes, {
			options: getOptions(attributes, manifest),
		})}
	/>
);

export const icons = () => (
	<>
		{manifest.options.iconName.map((values, index) => (
			<div
			css={{
				display: 'flex',
				marginBottom: '20px',
			}}
			key={index}>
				<IconEditor
					{...props('icon', attributes, {
						iconName: values.value,
					})}
				/>

				<div css={{
					marginLeft: '20px',
				}}>
					{values.label}
				</div>
				<br />
			</div>
		))}
	</>
);
