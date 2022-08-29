import React, { useState } from 'react';
import { IconToggle } from '../icon-toggle';
import { icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import readme from './readme.mdx';

export default {
	title: 'Options/IconToggle',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [current, setCurrent] = useState(false);

	return (
		<div style={{width: '20rem'}}>
			<IconToggle
				icon={icons.width}
				label='Full width'
				checked={current}
				onChange={(value) => setCurrent(value)}
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				help={__('Help text here.', 'eightshift-frontend-libs')}
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				type='checkbox'
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				help={__('Help text here.', 'eightshift-frontend-libs')}
				type='checkbox'
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				type='button'
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				type='iconButton'
			/>

			<br />

			<IconToggle
				icon={icons.width}
				label={__('Full width', 'eightshift-frontend-libs')}
				checked={current}
				onChange={(value) => setCurrent(value)}
				type='tileButton'
			/>
		</div>
	);
};
