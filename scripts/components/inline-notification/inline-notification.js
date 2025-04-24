import React from 'react';
import { Notice } from '@eightshift/ui-components';

/**
 * @deprecated Use `Notice` from `@eightshift/ui-components` instead.
 *
 * A simple notification to be used inside the Editor or Options.
 *
 * @typedef {'warning'|'error'|'info'|'success'} NotificationType
 *
 * @param {object} props - Notification options.
 * @param {string} props.text - Notification text.
 * @param {React.Component} [props.iconOverride] - If set, overrides the icon set for the type.
 * @param {string} [props.subtitle] - Subtitle text.
 * @param {string} [props.noBottomSpacing] - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {NotificationType} [props.type] - Help text displayed below the picker.
 * @param {string?} [props.additionalClasses] - If provided, the classes are added
 */
export const Notification = ({ text, iconOverride, subtitle, type, additionalClasses }) => {
	return (
		<Notice
			type={type}
			label={text}
			subtitle={subtitle}
			icon={iconOverride}
			className={additionalClasses}
		/>
	);
};
