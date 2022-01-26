import React from 'react';
import readme from './readme.mdx';
import { __ } from '@wordpress/i18n';
import { InlineNotification, InlineNotificationType } from '../inline-notification';

export default {
	title: 'Options/InlineNotification',
	parameters: {
		docs: {
			page: readme
		}
	},
};
export const regular = () => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
		}}>
			<InlineNotification
				text={__('This is a warning!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.WARNING}
			/>

			<InlineNotification
				text={__('This is an error!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.ERROR}
			/>

			<InlineNotification
				text={__('This is informational!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.INFO}
			/>
			
			<InlineNotification
				text={__('This is a warning!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.WARNING}
				showContrastOutline
			/>

			<InlineNotification
				text={__('This is an error!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.ERROR}
				showContrastOutline
			/>

			<InlineNotification
				text={__('This is informational!', 'eightshift-frontend-libs')}
				type={InlineNotificationType.INFO}
				showContrastOutline
			/>
		</div>
	);
};
