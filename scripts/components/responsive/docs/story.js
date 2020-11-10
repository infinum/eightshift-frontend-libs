import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import { Responsive } from '../responsive';

export default {
	title: 'Options|Responsive',
	parameters: {
		notes: readme,
	},
};

const props = {};

// const defaultProps = {
// 	breakpoints: 'Color Selector',
// 	help: 'Change color.',
// 	onChange: () => {},
// 	value: 'Color',
// };

export const component = () => (
	<Responsive
		{...props}
	/>
);

// export const SelectedColorsFromColorPalette = () => {

// 	const {
// 		primary,
// 	} = getPaletteColors();

// 	return (
// 		<ColorPaletteCustom
// 			{...defaultProps}
// 			label={'Selected colors from color palette'}
// 			colors={[primary]}
// 		/>

// 	);
// };

// export const CustomSpecificColor = () => {
// 	const specificColor = {
// 		name: 'Specific',
// 		slug: 'specific',
// 		color: '#FF11BB',
// 	};

// 	return (
// 		<ColorPaletteCustom
// 			{...defaultProps}
// 			label={'Custom specific color'}
// 			colors={[specificColor]}
// 		/>
// 	);
// };

