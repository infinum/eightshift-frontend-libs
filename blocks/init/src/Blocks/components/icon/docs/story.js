import React from 'react'; // eslint-disable-line no-unused-vars
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
