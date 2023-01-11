import React from 'react';
import readme from './readme.mdx';
import { HeadingLevel } from '../heading-level';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { Notification } from '../../inline-notification/inline-notification';

export default {
	title: 'Options/Heading Level',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const defaultProps = {
	minLevel: 1,
	maxLevel: 6,
	selectedLevel: 2,
	onChange: () => { },
};

export const component = () => (
	<>
		<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Toolbar heading level picker</h1>

		<div className='es-display-flex es-flex-wrap es-gap-5!'>
			<SingleItemShowcase
				title='Control'
				additionalPanels={[
					{
						content: (
							<Notification
								text='This is a legacy component'
								subtitle="We are trying to avoid putting too many controls in the block toolbar because it gets messy with complex blocks. Use something like OptionSelector in your block's options instead."
								type='warning'
								noBottomSpacing
							/>
						)
					}
				]}
			>
				<HeadingLevel
					{...defaultProps}
				/>
			</SingleItemShowcase>
		</div>
	</>

);
