import React from 'react';
import { classnames, Control } from '@eightshift/frontend-libs/scripts';
import { IconLabel } from '../icon-label/icon-label';
import { icons } from '../../editor/icons/icons';

/**
 * A simple notification to be used inside the Editor or Options.
 *
 * @typedef {'warning'|'error'|'info'|'success'} NotificationType
 *
 * @param {object} props                          - Notification options.
 * @param {string} props.text                     - Notification text.
 * @param {React.Component} [props.iconOverride]  - If set, overrides the icon set for the type.
 * @param {string} [props.subtitle]               - Subtitle text.
 * @param {string} [props.noBottomSpacing]        - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {NotificationType} [props.type]         - Help text displayed below the picker.
 */
export const Notification = ({
	text,
	iconOverride,
	subtitle,
	type,
	noBottomSpacing,
	reducedBottomSpacing,
}) => {
	let icon, classes, iconColor;

	switch (type) {
		case 'error':
			icon = icons.errorCircleFillTransparent;
			classes = 'es-border-red-500';
			iconColor = 'es-nested-color-red-500!';
			break;
		case 'warning':
			icon = icons.warningFillTransparent;
			classes = 'es-border-yellow-500';
			iconColor = 'es-nested-color-yellow-500!';
			break;
		case 'success':
			icon = icons.checkCircleFillTransparent;
			classes = 'es-border-green-500';
			iconColor = 'es-nested-color-green-500!';
			break;
		case 'info':
			icon = icons.infoCircleFillTransparent;
			classes = 'es-border-blue-500';
			iconColor = 'es-nested-color-blue-500!';
			break;
		default:
			classes = 'es-border-cool-gray-500';
			iconColor = 'es-nested-color-cool-gray-500!';
	}

	return (
		<Control
			additionalClasses={classnames('es-p-2 es-rounded-2', classes)}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
		>
			<IconLabel icon={iconOverride ?? icon} label={text} subtitle={subtitle} additionalClasses={iconColor} standalone />
		</Control>
	);
};
