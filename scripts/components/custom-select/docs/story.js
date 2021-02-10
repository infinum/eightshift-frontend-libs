import React from 'react';
import readme from './readme.mdx';
import { CustomSelect } from '../custom-select';

export default {
	title: 'Options/Custom Select',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const defaultProps = {
	label: 'Color Selector',
	help: 'Change color.',
	onChange: () => {},
	value: 'Color',
};

const data = [
	{
		'label': 'Item 1',
		'value': 1,
	},
	{
		'label': 'Item 2',
		'value': 2,
	},
	{
		'label': 'Item 3',
		'value': 3,
	},
	{
		'label': 'Item 4',
		'value': 4,
	},
]

export const SelectSingle = () => {
	return (
		<CustomSelect
			{...defaultProps}
			label={'Single Select'}
			options={data}
		/>
	)
};

export const SelectMultiple = () => {
	return (
		<CustomSelect
			{...defaultProps}
			multiple={true}
			label={'Multiple Select'}
			options={data}
		/>
	)
};
