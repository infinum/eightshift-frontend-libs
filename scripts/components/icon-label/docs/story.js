import React from 'react';
import { IconLabel } from '../icon-label';
import { icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import readme from './readme.mdx';

export default {
	title: 'Options/IconLabel',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<IconLabel
			icon={icons.color}
			label={__('Color', 'eightshift-frontend-libs')}
			standalone
		/>
	);
};
