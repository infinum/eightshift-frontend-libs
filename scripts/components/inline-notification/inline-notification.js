import React from 'react';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import classnames from 'classnames';

/**
 * Type of the inline notification
 *
 * @param {string} WARNING - An important, but not critical message.
 * @param {string} ERROR   - An urgent and important message.
 * @param {string} INFO    - A message to inform the user.
 */
export const InlineNotificationType = {
	WARNING: 'warning',
	ERROR: 'error',
	INFO: 'info'
}

/**
 * A simple inline notification to be used inside the Editor or Options.
 * 
 * @param {object} props                                                       - InlineNotification options.
 * @param {string} props.text                                                  - Notification text.
 * @param {InlineNotificationType} [props.type=InlineNotificationType.WARNING] - Help text displayed below the picker.
 * @param {boolean} [props.showContrastOutline=false]                          - If `true`, a high-visibility outline is shown around the notification.
 */
export const InlineNotification = ({
	text,
	type = InlineNotificationType.WARNING,
	showContrastOutline = false,
}) => {
	let icon;

	switch (type) {
		case InlineNotificationType.ERROR:
			icon = icons.errorCircle;
			break;
		case InlineNotificationType.WARNING:
			icon = icons.warning;
			break;
		default:
			icon = icons.infoCircle;
			break;
	}

	return (
		<div className={classnames([
			'es-inline-notification',
			`es-inline-notification--${type}`,
			showContrastOutline ? 'es-hi-vis-outline' : '',
		])}>
			<i className='es-inline-notification__icon' role='presentation'>{icon}</i>
			<span>{text}</span>
		</div>
	);
}
