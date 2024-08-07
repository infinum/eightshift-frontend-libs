import React from 'react';
import { Button } from '@eightshift/ui-components';

/**
 * Button with an icon and text below it.
 *
 * @param {object} props TileButton props.
 * @param {React.Component} props.icon       - Icon shown on the button.
 * @param {React.Component} props.label      - Label shown below the icon.
 * @param {callback} [props.onClick]         - Click action.
 * @param {boolean} [props.isPressed=false]  - If `true`, the button renders as pressed.
 * @param {string} [props.additionalClasses] - Classes passed to the button.
 */
export const TileButton = (props) => {
	const {
		icon,
		label,

		onClick,
		isPressed = false,

		ref,

		additionalClasses,
	} = props;

	return (
		<Button
			{...props}
			icon={icon}
			onPress={onClick}
			type={isPressed ? 'selected' : 'default'}
			className={additionalClasses}
			forwardedRef={ref}
		>
			{label}
		</Button>
	);
};
