import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { ColorPickerComponent, ColorPickerType } from '../color-picker-component';
import { getPaletteColors } from '../../../editor';

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
