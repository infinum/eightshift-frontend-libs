import React, { useState } from 'react';
import readme from './readme.mdx';
import { ColorPalette } from '../color-palette-custom';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: 'Options/ColorPalette',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [color, setColor] = useState();

	const defaultProps = {
		label: 'Control name',
		subtitle: 'Subtitle',
		actions: (
			<div className='es-h-spaced'>{icons.emptyRect}{icons.emptyRect}{icons.emptyRect}</div>
		),
		icon: icons.emptyCircle,
		onChange: (value) => setColor(value),
		value: color,
		noBottomSpacing: true,
	};

	const customColors = [
		{
			name: 'Specific 1',
			slug: 'specific-1',
			color: '#FF11BB',
		},
		{
			name: 'Specific 2',
			slug: 'specific-2',
			color: '#0D3636',
		},
		{
			name: 'Transparent',
			slug: 'transparent',
			color: 'transparent',
		}
	];

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Color palette</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic picker'>
					<ColorPalette
						{...defaultProps}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom colors'>
					<ColorPalette
						{...defaultProps}
						colors={customColors}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Searchable'>
					<ColorPalette
						{...defaultProps}
						searchable
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Clearable'>
					<ColorPalette
						{...defaultProps}
						clearable
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='List view'>
					<ColorPalette
						{...defaultProps}
						layout='list'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Two-column list view'>
					<ColorPalette
						{...defaultProps}
						layout='listTwoCol'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Shade grouping disabled'>
					<ColorPalette
						{...defaultProps}
						layout='default'
						noShadeGrouping
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
