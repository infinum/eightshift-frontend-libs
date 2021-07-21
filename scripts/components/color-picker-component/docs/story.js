import React from 'react';
import readme from './readme.mdx';
import { useState } from '@wordpress/element';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { ColorPickerComponent } from '@eightshift/frontend-libs/scripts/components/color-picker-component/color-picker-component';
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
			label={
				<>
					{icons.color}
					<span>My color picker</span>
				</>
			}
			colors={getPaletteColors()}
			value={objData.color}
			onChange={(value) => setObjData({ color: value })}
		/>
	);
}
