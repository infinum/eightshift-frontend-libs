import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { ColorPickerComponent, ColorPickerType } from '../color-picker-component';

export default {
	title: 'Options/ColorPickerComponent',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const maxWidthStyle = {
	maxWidth: '15rem',
};

const getPaletteColors = () => (
	[
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
	]
);

export const component = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<div style={maxWidthStyle}>
			<ColorPickerComponent
				label='Sample color'
				colors={getPaletteColors()}
				value={objData.color}
				onChange={(value) => setObjData({ color: value })}
			/>

		</div>
	);
};

export const textColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<div style={maxWidthStyle}>
			<ColorPickerComponent
				label='Text color'
				colors={getPaletteColors()}
				value={objData.color}
				onChange={(value) => setObjData({ color: value })}
				type={ColorPickerType.TEXT_COLOR}
			/>

		</div>
	);
};

export const textHighlightColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<div style={maxWidthStyle}>
			<ColorPickerComponent
				label='Text highlight color'
				colors={getPaletteColors()}
				value={objData.color}
				onChange={(value) => setObjData({ color: value })}
				type={ColorPickerType.TEXT_HIGHLIGHT_COLOR}
			/>

		</div>
	);
};

export const backgroundColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<div style={maxWidthStyle}>
			<ColorPickerComponent
				label='Background color'
				colors={getPaletteColors()}
				value={objData.color}
				onChange={(value) => setObjData({ color: value })}
				type={ColorPickerType.BACKGROUND_COLOR}
			/>
		</div>
	);
};
