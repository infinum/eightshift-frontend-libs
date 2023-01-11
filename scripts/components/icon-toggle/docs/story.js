import React, { useState } from 'react';
import { IconToggle } from '../icon-toggle';
import { icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/IconToggle',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [current, setCurrent] = useState(false);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Toggle</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic toggle'>
					<IconToggle
						icon={icons.width}
						label='Full width'
						checked={current}
						onChange={(value) => setCurrent(value)}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Help text'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						help={__('Help text here.', 'eightshift-frontend-libs')}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Inline help text'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						help={__('Help text here (inline help).', 'eightshift-frontend-libs')}
						inlineHelp
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Checkbox'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='checkbox'
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle button'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='button'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle icon button'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='iconButton'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle tile button'>
					<IconToggle
						icon={icons.width}
						label={__('Full width', 'eightshift-frontend-libs')}
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='tileButton'
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
