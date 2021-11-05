import React, { useState } from 'react';
import { IconToggle } from '../icon-toggle';
import { icons } from '../../../editor/icons/icons';
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
		</div>
	);
};
