import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Expandable } from '@eightshift/ui-components';

/**
 * A collapsable container for options.
 *
 * @deprecated Use `Expandable` from `@eightshift/ui-components` instead.
 *
 * @param {object} props                              - Collapsable options.
 * @param {React.Component?} [props.icon]             - Icon to show next to the label
 * @param {string} props.label                        - Trigger label.
 * @param {React.Component?} [props.subtitle]         - Subtitle below the label.
 * @param {boolean} [props.noBottomSpacing]           - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]     - If `true`, space below the control is reduced.
 * @param {React.Component} props.children            - Child items that are shown when expanded.
 * @param {string?} [props.additionalClasses]         - If passed, the classes are appended to the component classes.
 * @param {React.Component?} [props.actions]          - Actions to show to the right of the label.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are kept visible when the component is expanded.
 * @param {boolean} [props.disabled=false]            - If `true`, the expand button is disabled.
 */
export const Collapsable = ({
	icon,
	label,
	subtitle,

	children,
	additionalClasses,

	actions,

	keepActionsOnExpand = false,

	disabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	if (disabled && isOpen) {
		setIsOpen(false);
	}

	return (
		<Expandable
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={additionalClasses}
			actions={actions}
			keepActionsOnExpand={keepActionsOnExpand}
			disabled={disabled}
		>
			{children}
		</Expandable>
	);
};
