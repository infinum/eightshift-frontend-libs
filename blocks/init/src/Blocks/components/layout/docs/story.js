import React from 'react';
import { getExample, props } from '@eightshift/frontend-libs/scripts/editor';
import { LayoutEditor } from '../components/layout-editor';
import { CardEditor } from '../../card/components/card-editor';
import cardManifest from './../../card/manifest.json';
import manifest from './../manifest.json';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Layout',
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
	<GetStoryComponentDescription manifest={manifest}>
		<LayoutEditor
			{...props('layout', attributes, {
				layoutType: 'layout-grid-2',
			})}
		/>
	</GetStoryComponentDescription>
);

export const layoutGrid3 = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LayoutEditor
			{...props('layout', attributes, {
				layoutType: 'layout-grid-3',
			})}
		/>
	</GetStoryComponentDescription>
);

export const layoutGrid4 = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<LayoutEditor
			{...props('layout', attributes, {
				layoutType: 'layout-grid-4',
			})}
		/>
	</GetStoryComponentDescription>
);
