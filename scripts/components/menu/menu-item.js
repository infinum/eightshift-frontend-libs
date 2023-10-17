import React from 'react';
import { Button } from '@wordpress/components';
import { classnames } from '../../helpers';

/**
 * @since 8.5.0
 *
 * A simple menu item.
 *
 * @param {object} props                            - MenuItem options.
 * @param {React.Component?} [props.icon]           - Icon to show within the menu item.
 * @param {(string|React.Component)?} [props.label] - Label to show inside the menu item.
 * @param {function?} [props.onClick]               - Button click action.
 * @param {boolean?} [props.disabled=false]         - If `true`, the menu item is disabled.
 * @param {string?} [props.additionalClass]         - Pass custom class(es) to the menu item.
 * @param {object?} [props.customProps]             - Pass custom props to the menu item.
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
		<Button
			icon={icon}
			onClick={onClick}
			className={classnames(
				'es-rounded-1.5 es-gap-1.5! es-transition-colors es-min-w-max! es-nested-m-0!',
				!disabled && 'es-hover-color-current! es-hover-bg-cool-gray-50 es-nested-color-cool-gray-450',
				disabled && 'es-nested-color-cool-gray-200',
				additionalClass
			)}
			disabled={disabled}
			{...customProps}
		>
			{label}
		</Button>
	);
};
