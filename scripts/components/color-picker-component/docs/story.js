import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { ColorPickerComponent, ColorPickerType } from '@eightshift/frontend-libs/scripts/components/color-picker-component/color-picker-component';
import { getPaletteColors } from '../../../editor';

export default {
	title: 'Options/ColorPickerComponent',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<ColorPickerComponent
			label='Sample color'
			colors={getPaletteColors()}
			value={objData.color}
			onChange={(value) => setObjData({ color: value })}
		/>
	);
}

export const textColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<ColorPickerComponent
			label='Text color'
			colors={getPaletteColors()}
			value={objData.color}
			onChange={(value) => setObjData({ color: value })}
			type={ColorPickerType.TEXT_COLOR}
		/>
	);
}

export const textHighlightColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<ColorPickerComponent
			label='Text highlight color'
			colors={getPaletteColors()}
			value={objData.color}
			onChange={(value) => setObjData({ color: value })}
			type={ColorPickerType.TEXT_HIGHLIGHT_COLOR}
		/>
	);
}

export const backgroundColor = () => {
	const [objData, setObjData] = useState({ color: undefined });

	return (
		<ColorPickerComponent
			label='Background color'
			colors={getPaletteColors()}
			value={objData.color}
			onChange={(value) => setObjData({ color: value })}
			type={ColorPickerType.BACKGROUND_COLOR}
		/>
	);
}
