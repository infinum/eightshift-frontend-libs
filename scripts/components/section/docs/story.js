import React from 'react';
import readme from './readme.mdx';
import { Section } from '../section';
import { icons } from '@eightshift/frontend-libs/scripts';

export default {
	title: `Options/Section`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const simpleDivider = () => (
	<>
		<h4>Regular</h4>
		<Section label='Divider'>
			<p>Content inside the section</p>
		</Section>
		<br />

		<h4>With icon</h4>
		<Section label='Divider' icon={icons.iconGeneric}>
			<p>Content inside the section</p>
		</Section>
		<br />
	</>
);
