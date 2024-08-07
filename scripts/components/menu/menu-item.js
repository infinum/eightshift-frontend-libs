import React from 'react';
import { MenuItem as EsUicMenuItem } from '@eightshift/ui-components';

/**
 * @since 8.5.0
 *
 * @deprecated Use `MenuItem` from `@eightshift/ui-components` instead.
 *
 * A simple menu item.
 *
 * @param {object} props - MenuItem options.
 * @param {React.Component?} [props.icon] - Icon to show within the menu item.
 * @param {(string|React.Component)?} [props.label] - Label to show inside the menu item.
 * @param {function?} [props.onClick] - Button click action.
 * @param {boolean?} [props.disabled=false] - If `true`, the menu item is disabled.
 * @param {string?} [props.additionalClass] - Pass custom class(es) to the menu item.
 * @param {object?} [props.customProps] - Pass custom props to the menu item.
 */
export const MenuItem = (props) => {
	const {
		icon,
		label,
		onClick,
		disabled,

		additionalClass,

		customProps,
	} = props;

	return (
		<EsUicMenuItem
			icon={icon}
			onClick={onClick}
			className={additionalClass}
			disabled={disabled}
			{...customProps}
		>
			{label}
		</EsUicMenuItem>
	);
};
