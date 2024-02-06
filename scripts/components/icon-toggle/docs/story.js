import React, { useState } from 'react';
import { IconToggle } from '../icon-toggle';
import { icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/IconToggle',
};

export const component = () => {
	const [current, setCurrent] = useState(false);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Toggle</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic toggle'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Help text'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						help={__('Help text here.', 'eightshift-frontend-libs')}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Inline help text'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						help={__('Help text here (inline help).', 'eightshift-frontend-libs')}
						inlineHelp
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Checkbox'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='checkbox'
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle button'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='button'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle icon button'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='iconButton'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggle tile button'>
					<IconToggle
						icon={icons.fullMaxShield}
						label='Full max'
						checked={current}
						onChange={(value) => setCurrent(value)}
						type='tileButton'
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
