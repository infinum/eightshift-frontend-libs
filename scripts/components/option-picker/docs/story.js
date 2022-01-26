import React from 'react';
import readme from '@eightshift/frontend-libs/scripts/components/option-picker/docs/readme.mdx';
import { OptionPicker } from '@eightshift/frontend-libs/scripts/components/option-picker/option-picker';

export default {
	title: 'Options/OptionPicker',
	parameters: {
		docs: {
			page: readme
		}
	},
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
		<OptionPicker
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
		<OptionPicker
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
		<OptionPicker
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
