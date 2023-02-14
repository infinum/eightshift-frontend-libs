import React from 'react';
import { Button } from '@wordpress/components';
import { PopoverWithTrigger } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/PopoverWithTrigger',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Popover with trigger</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Base component' demoContainerClass='es-h-center'>
					<PopoverWithTrigger
						trigger={
							({ ref, setIsOpen, isOpen }) => {
								return (
									<Button
										ref={ref}
										onClick={() => setIsOpen(!isOpen)}
										className='es-w-14 es-content-center es-rounded-1.5! es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-500 es-hover-color-cool-gray-800!'
									>
										Open
									</Button>
								);
							}
						}
					>
						<div className='es-h-40 es-w-full es-rounded-1 es-bg-cool-gray-100 es-display-flex es-items-center es-content-center'>
							Demo content
						</div>
					</PopoverWithTrigger>
				</SingleItemShowcase>
			</div>
		</>
	);
};
