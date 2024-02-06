import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { icons, TileButton } from '@eightshift/frontend-libs/scripts';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/TileButton',
};

export const component = () => {
	const [value, setValue] = useState(false);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>TileButton</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Base component'>
					<TileButton
						icon={icons.infoCircle}
						label={__('Click me', 'eightshift-frontend-libs')}
						onClick={() => { }}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Toggleable'>
					<TileButton
						icon={value ? icons.zapFill : icons.zap}
						label={__('Zap!', 'eightshift-frontend-libs')}
						onClick={() => setValue(!value)}
						isPressed={value}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
