import React from 'react';
import readme from './readme.mdx';
import { FancyDivider } from '../fancy-divider';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: `Options/FancyDivider`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => (
	<>
		<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Divider</h1>

		<div className='es-display-flex es-flex-wrap es-gap-5!'>
			<SingleItemShowcase title='Basic divider'>
				<FancyDivider label='Divider' noBottomSpacing />
			</SingleItemShowcase>

			<SingleItemShowcase title='With icon'>
				<FancyDivider icon={icons.genericShapesAlt} label='Divider' noBottomSpacing />
			</SingleItemShowcase>
		</div>
	</>
);
