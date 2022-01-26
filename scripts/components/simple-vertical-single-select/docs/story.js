import React, { useState } from 'react';
import { SimpleVerticalSingleSelect, IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';

export default {
	title: 'Options/SimpleVerticalSingleSelect',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [first, setFirst] = useState(0);
	const [second, setSecond] = useState(false);

	const options = [
		{
			onClick: () => setFirst(0),
			icon: icons.small,
			label: 'Small',
			isActive: first === 0,
		},
		{
			onClick: () => setFirst(1),
			icon: icons.medium,
			label: 'Medium',
			isActive: first === 1,
		},
		{
			onClick: () => setFirst(2),
			icon: icons.large,
			label: 'Large',
			isActive: first === 2,
		}
	];

	const options2 = [
		{
			onClick: () => setSecond(0),
			label: 'Show all posts',
			isActive: !second,
		},
		{
			onClick: () => setSecond(1),
			label: 'Show posts from the same category',
			isActive: second,
		}
	];

	return (
		<div style={{ width: 'max-content' }}>
			<SimpleVerticalSingleSelect
				label={<IconLabel icon={icons.checkCircle} label='With icons' />}
				options={options}
			/>

			<SimpleVerticalSingleSelect
				label={<IconLabel icon={icons.none} label='Without icons' />}
				options={options2}
			/>
		</div>
	);
};
