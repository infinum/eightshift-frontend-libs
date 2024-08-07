import React from 'react';
import { Menu as EsUicMenu } from '@eightshift/ui-components';

/**
 * @since 8.5.0
 *
 * @deprecated Use `Menu` from `@eightshift/ui-components` instead.
 *
 * A simple dropdown menu.
 *
 * @param {object} props - Menu options.
 * @param {React.Component?} [props.icon] - Icon to show within the menu open button.
 * @param {(string|React.Component)?} [props.label] - Label to show inside the menu open button.
 * @param {(string|React.Component)?} [props.tooltip] - Tooltip to show on the menu open button.
 * @param {boolean?} [props.disabled=false] - If `true`, the menu open button is disabled.
 * @param {string?} [props.buttonClass] - Replace the menu open default class.
 * @param {string?} [props.additionalClass] - Pass custom class(es) to the menu open button.
 * @param {object?} [props.buttonProps] - Pass custom props to the menu open button.
 * @param {object?} [props.popoverProps] - Pass custom props to the popover that contains the menu items.
 */
export const Menu = (props) => {
	const {
		icon,
		label,
		tooltip,

		disabled = false,

		buttonClass,

		buttonProps,

		popoverProps,

		children,
	} = props;

	return (
		<EsUicMenu
			triggerIcon={icon}
			triggerLabel={label}
			tooltip={tooltip}
			triggerProps={{
				className: buttonClass,
				...buttonProps,
				disabled: disabled,
			}}
			popoverProps={popoverProps}
		>
			{children}
		</EsUicMenu>
	);
};
