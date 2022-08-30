import React from 'react';
import readme from './readme.mdx';
import { FancyDivider } from '../fancy-divider';
import { IconLabel, icons } from '@eightshift/frontend-libs/scripts';

export default {
	title: `Options/FancyDivider`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const simpleDivider = () => (
	<>
		<h4>Regular divider</h4>
		<FancyDivider label='Divider' />
		<br />

		<h4>With icon</h4>
		<FancyDivider label={<IconLabel icon={icons.iconGeneric} label='Divider' />} />
		<br />

		<h4>Uppercase text</h4>
		<FancyDivider label='Divider' lowercase={false} />
		<br />

		<h4>Uppercase text with icon</h4>
		<FancyDivider label={<IconLabel icon={icons.iconGeneric} label='Divider' />} lowercase={false} />
	</>
);
