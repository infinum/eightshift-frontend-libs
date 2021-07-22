import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import manifest from './../manifest.json';
import { LayoutThreeColumnsEditor } from '../components/layout-three-columns-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const attributes = getExample('layoutThreeColumns', manifest);

export const editor = () => (
	<LayoutThreeColumnsEditor {...props('layoutThreeColumns', attributes)} />
);
