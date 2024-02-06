import React from 'react';
import { ToolbarOptionPicker } from '../toolbar-option-picker';

export default {
	title: 'Options/ToolbarOptionPicker',
};

const demoOptions = [
	{
		value: 'top',
		title: 'Align top',
		icon: 'verticalAlignTop'
	},
	{
		value: 'center',
		title: 'Align center',
		icon: 'verticalAlignCenter'
	},
	{
		value: 'bottom',
		title: 'Align bottom',
		icon: 'verticalAlignBottom'
	}
];

export const component = () => {
	return (
		<ToolbarOptionPicker
			value={'top'}
			onChange={(value) => console.info(value)}
			isToolbarButton={false}
			isInToolbar={false}
			options={demoOptions}
			label={'Option label'}
		/>
	);
};

export const toolbarGroup = () => {
	return (
		<ToolbarOptionPicker
			value={'top'}
			onChange={(value) => console.info(value)}
			isToolbarButton={true}
			isInToolbar={true}
			options={demoOptions}
			label={'Option label'}
		/>
	);
};

export const toolbarGroupInline = () => {
	return (
		<ToolbarOptionPicker
			value={'top'}
			onChange={(value) => console.info(value)}
			isToolbarButton={true}
			isInToolbar={true}
			isInline
			options={demoOptions}
			label={'Option label'}
		/>
	);
};
