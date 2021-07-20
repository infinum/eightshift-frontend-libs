import React from 'react';
import readme from './readme.mdx';
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
				text='This is a warning!'
				type={InlineNotificationType.warning}
			/>

			<InlineNotification
				text='This is an error!'
				type={InlineNotificationType.error}
			/>

			<InlineNotification
				text='This is informational!'
				type={InlineNotificationType.info}
			/>
			
			<InlineNotification
				text='This is a warning!'
				type={InlineNotificationType.warning}
				showContrastOutline
			/>

			<InlineNotification
				text='This is an error!'
				type={InlineNotificationType.error}
				showContrastOutline
			/>

			<InlineNotification
				text='This is informational!'
				type={InlineNotificationType.info}
				showContrastOutline
			/>
		</div>
	);
}
