import React from 'react';
import _ from 'lodash';
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

const card = {
	...getExample('card', cardManifest),
	"cardMediaImageUrl": "card-image.jpg",
	"cardMediaUse": true,
	"cardHeadingTypographySize": "24-text",
	"cardHeadingTypographyContent": "Locker – A Simple and Maintainable Authentication Library",
	"cardParagraphTypographyContent": "By observing users' actions, so-called events, it's possible to make data-driven decisions that can help bring more users to.",
	"cardParagraphTypographyUse": true,
	"cardButtonTypographyContent": "Read"
};

const attributes = {
	...getExample('layout', manifest),
	layoutItems: [...Array(6)].map((e, i) => (
		<CardEditor
			key={i}
			{...props('card', card)}
		/>
	))
};

export const featured = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-featured',
		})}
	/>
);

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

export const layout1 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-one',
		})}
	/>
);

export const layout2 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-two',
		})}
	/>
);

export const layout3 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-three',
		})}
	/>
);

export const layout4 = () => (
	<LayoutEditor
		{...props('layout', attributes, {
			layoutType: 'layout-four',
		})}
	/>
);
