import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { ColorPicker } from '../color-picker-component';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/ColorPicker',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [objData, setObjData] = useState({ color: undefined });

	const colors = [
		{
			name: 'Primary 300',
			slug: 'primary300',
			color: '#BFBEFC'
		},
		{
			name: 'Primary 500',
			slug: 'primary500',
			color: '#610BEF'
		},
		{
			name: 'Primary 700',
			slug: 'primary700',
			color: '#4700AB'
		},
		{
			name: 'Black',
			slug: 'black',
			color: '#14142B'
		},
		{
			name: 'White',
			slug: 'white',
			color: '#FFFFFF'
		}
	];

	const commonProps = {
		colors: colors,
		label: 'Component',
		value: objData?.color,
		onChange: (value) => setObjData({ color: value }),
		noBottomSpacing: true,
	};

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Color swatch</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Base component'>
					<ColorPicker
						{...commonProps}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Text color picker'>
					<ColorPicker
						{...commonProps}
						type='textColor'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Text highlight color picker'>
					<ColorPicker
						{...commonProps}
						type='textHighlightColor'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Background color picker'>
					<ColorPicker
						{...commonProps}
						type='backgroundColor'
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
