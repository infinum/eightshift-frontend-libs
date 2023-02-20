import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { AnimatedContentVisibility } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/AnimatedContentVisibility',
	parameters: {
		docs: {
			page: readme
		}
	},
};


export const component = () => {
	const [visible, setVisible] = useState(true);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Animated visibility</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase
					title='Base component'
					demoContainerClass='es-h-48'
					additionalPanels={[{
						title: 'Actions',
						content: (
							<Button onClick={() => setVisible(!visible)} className='es-w-14 es-content-center es-rounded-1.5! es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-500 es-hover-color-cool-gray-800!'>
								{visible ? 'Hide' : 'Show'}
							</Button>
						),
					}]}
				>
					<AnimatedContentVisibility showIf={visible}>
						<div className='es-h-40 es-w-full es-rounded-1 es-bg-cool-gray-100 es-display-flex es-items-center es-content-center'>
							Demo content
						</div>
					</AnimatedContentVisibility>
				</SingleItemShowcase>
			</div>
		</>
	);
};
