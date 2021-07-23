import React from 'react';
import readme from './readme.mdx';
import manifest from '../manifest.json';
import { AdvancedColorPicker } from '../advanced-color-picker';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const project = () => (
	<AdvancedColorPicker
		type={'project'}
		colorProject={'primary'}
		colorSolid={undefined}
		colorGradient={undefined}
		onChangeProject={() => {}}
		onChangeSolid={() => {}}
		onChangeGradient={() => {}}
		onChangeType={() => {}}
	/>
);
export const solid = () => (
	<AdvancedColorPicker
		type={'solid'}
		colorProject={undefined}
		colorSolid={'#900000'}
		colorGradient={undefined}
		onChangeProject={() => {}}
		onChangeSolid={() => {}}
		onChangeGradient={() => {}}
		onChangeType={() => {}}
	/>
);

export const gradient = () => (
	<AdvancedColorPicker
		type={'gradient'}
		colorProject={undefined}
		colorSolid={undefined}
		colorGradient={'linear-gradient(90deg, #280F56 0%, #27D6AF 100%)'}
		onChangeProject={() => {}}
		onChangeSolid={() => {}}
		onChangeGradient={() => {}}
		onChangeType={() => {}}
	/>
);
