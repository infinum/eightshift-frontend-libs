import React from 'react';
import { ColorSwatch } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/ColorSwatch',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Color swatch</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Nothing'>
					<ColorSwatch />
				</SingleItemShowcase>

				<SingleItemShowcase title='Transparent (checkerboard)' demoContainerClass='es-h-spaced'>
					<ColorSwatch color='transparent' />
					<ColorSwatch color='transparent' selected />
				</SingleItemShowcase>

				<SingleItemShowcase title='Solid color' demoContainerClass='es-h-spaced'>
					<ColorSwatch color='#0D3636' />
					<ColorSwatch color='#0D3636' selected />
				</SingleItemShowcase>

				<SingleItemShowcase title='Gradient' demoContainerClass='es-h-spaced'>
					<ColorSwatch color='linear-gradient(135deg, red 0%, yellow 100%)' />
					<ColorSwatch color='linear-gradient(135deg, red 0%, yellow 100%)' selected />
				</SingleItemShowcase>
			</div>
		</>
	);
};
