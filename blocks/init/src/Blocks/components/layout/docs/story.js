import React from 'react';
import readme from './readme.mdx';
import { getExample, props } from '@eightshift/frontend-libs/scripts/editor';
import { LayoutEditor } from '../components/layout-editor';
import { CardEditor } from '../../card/components/card-editor';
import cardManifest from './../../card/manifest.json';
import manifest from './../manifest.json';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const card = getExample('card', cardManifest);

const attributes = {
	...getExample('layout', manifest),
	layoutItems: [...Array(6)].map((e, i) => (
		<CardEditor
			key={i}
			{...props('card', card)}
		/>
	))
};

export const layoutGrid2 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-grid-2',
		})}
	/>
);

export const layoutGrid3 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-grid-3',
		})}
	/>
);

export const layoutGrid4 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-grid-4',
		})}
	/>
);
