import React from 'react';
import { Control, icons } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/Control',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Control base</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Label only'>
					<Control label='Label' noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Help text'>
					<Control label='Label' help='Help text' noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Subtitle'>
					<Control label='Label' subtitle='Subtitle' noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Icon'>
					<Control label='Label' icon={icons.emptyCircle} noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Icon & subtitle'>
					<Control label='Label' icon={icons.emptyCircle} subtitle='Subtitle' noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Actions'>
					<Control label='Label' actions={<div className='es-h-spaced'>{icons.emptyRect}{icons.emptyRect}{icons.emptyRect}</div>} noBottomSpacing>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Everything'>
					<Control
						label='Label'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						help='Help text'
						actions={<div className='es-h-spaced'>{icons.emptyRect}{icons.emptyRect}{icons.emptyRect}</div>}
						noBottomSpacing
					>
						<div className='es-w-full es-h-24 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>

				<SingleItemShowcase title='Inline label'>
					<Control
						label='Label'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						noBottomSpacing
						inlineLabel
					>
						<div className='es-w-20 es-h-8 es-bg-cool-gray-100 es-rounded-1'></div>
					</Control>
				</SingleItemShowcase>
			</div>
		</>
	);
};
