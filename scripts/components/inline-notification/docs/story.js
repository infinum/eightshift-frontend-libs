import React from 'react';
import { __ } from '@wordpress/i18n';
import { Notification } from '../inline-notification';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor/icons/icons';

export default {
	title: 'Options/Notification',
};

export const regular = () => {
	const text = __('This is a notification', 'eightshift-frontend-libs');
	const subtitle = __('Lorem ipsum dolor sit amet.', 'eightshift-frontend-libs');

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Notification</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Notification'>
					<Notification
						text={text}
						subtitle={subtitle}
						type='warning'
					/>

					<Notification
						text={text}
						subtitle={subtitle}
						type='error'
					/>

					<Notification
						text={text}
						subtitle={subtitle}
						type='info'
					/>

					<Notification
						text={text}
						subtitle={subtitle}
						type='success'
					/>

					<Notification
						text={text}
						subtitle={subtitle}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom icon'>
					<Notification
						text={text}
						subtitle={subtitle}
						iconOverride={icons.emptyRect}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
