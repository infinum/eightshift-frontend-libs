import React from 'react';
import readme from './readme.mdx';
import { HeadingLevel } from '../heading-level';
import { InlineNotification, InlineNotificationType } from '@eightshift/frontend-libs/scripts';

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
		<HeadingLevel
			{...defaultProps}
		/>

		<div className='es-max-w-92 es-mt-8'>
			<InlineNotification
				text='This is a legacy component'
				subtitle="We are trying to avoid putting too many controls in the block toolbar because it gets messy with complex blocks. Use something like SimpleHorizontalSingleSelect in your block's options instead."
				type={InlineNotificationType.INFO}
			/>
		</div>
	</>

);
