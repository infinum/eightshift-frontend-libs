import React from 'react';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import classnames from 'classnames';

export const InlineNotificationType = {
	warning: 'warning',
	error: 'error',
	info: 'info'
}

/**
 * A simple inline notification to be used inside the Editor or Options.
 * 
 * @param {object} props                                                       - InlineNotification options.
 * @param {string} props.text                                                  - Notification text.
 * @param {InlineNotificationType} [props.type=InlineNotificationType.warning] - Help text displayed below the picker.
 * @param {boolean} [props.showContrastOutline=false]                          - If `true`, a high-visibility outline is shown around the notification.
 */
export const InlineNotification = ({
	text,
	type = InlineNotificationType.warning,
	showContrastOutline = false,
}) => {
	let icon = icons.infoCircle;

	switch (type) {
		case InlineNotificationType.error:
			icon = icons.errorCircle;
			break;
		case InlineNotificationType.warning:
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
