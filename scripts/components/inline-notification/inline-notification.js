import React from 'react';
import { icons } from '../../../scripts';
import classnames from 'classnames';
import { IconLabel } from '../icon-label/icon-label';

/**
 * Type of the inline notification
 *
 * @param {string} WARNING - An important, but not critical message.
 * @param {string} ERROR   - An urgent and important message.
 * @param {string} INFO    - A message to inform the user.
 * @param {string} SUCCESS - A message to show success.
 */
export const InlineNotificationType = {
	WARNING: 'warning',
	ERROR: 'error',
	INFO: 'info',
	SUCCESS: 'success',
};

/**
 * A simple inline notification to be used inside the Editor or Options.
 * 
 * @param {object} props                                                       - InlineNotification options.
 * @param {string} props.text                                                  - Notification text.
 * @param {string} [props.subtitle]                                            - Notification text.
 * @param {string} [props.removeBottomFieldSpacing=false]                      - Notification text.
 * @param {InlineNotificationType} [props.type=InlineNotificationType.WARNING] - Help text displayed below the picker.
 * @param {boolean} [props.showContrastOutline=false]                          - If `true`, a high-visibility outline is shown around the notification.
 */
export const InlineNotification = ({
	text,
	subtitle,
	type = InlineNotificationType.WARNING,
	showContrastOutline = false,
	removeBottomFieldSpacing = false,
}) => {
	let icon;

	switch (type) {
		case InlineNotificationType.ERROR:
			icon = icons.errorCircle;
			break;
		case InlineNotificationType.WARNING:
			icon = icons.warning;
			break;
		case InlineNotificationType.SUCCESS:
			icon = icons.checkCircle;
			break;
		default:
			icon = icons.infoCircle;
			break;
	}

	return (
		<div className={classnames([
			'es-inline-notification-v2 es-p-s es-rounded-s',
			`es-inline-notification-v2--${type}`,
			showContrastOutline ? 'es-hi-vis-outline' : '',
			removeBottomFieldSpacing ? '': 'es-mb-l',
		])}>
			<IconLabel icon={icon} label={text} subtitle={subtitle} standalone/>
		</div>
	);
};
