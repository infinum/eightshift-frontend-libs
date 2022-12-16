import React, { forwardRef } from 'react';
import { classnames } from '../../helpers';
import { Button } from '@wordpress/components';

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
export const TileButton = forwardRef((props, ref) => {
	const {
		icon,
		label,

		onClick,
		isPressed = false,

		additionalClasses,
	} = props;

	return (
		<Button
			{...props}
			ref={ref}
			icon={icon}
			onClick={onClick}
			isPressed={isPressed}
			className={classnames('es-button-icon-24 es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-500 es-flex-grow-0 es-flex-shrink-0 es-rounded-1! es-has-v2-gutenberg-button-active-state es-flex-col es-gap-1.25! es-w-17! es-h-17! es-button-no-icon-spacing es-content-center! es-text-3! es-line-h-0.95 es-p-0.75! es-nested-flex-shrink-0', additionalClasses)}
		>
			<span className='es-h-6 es-v-center'>{label}</span>
		</Button>
	);
});
