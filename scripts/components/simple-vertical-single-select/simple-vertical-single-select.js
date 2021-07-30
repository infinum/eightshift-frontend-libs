import React from 'react';
import { BaseControl, Button } from '@wordpress/components';

/**
 * A simple and elegant vertical option picker, best used for up to 5 options.
 * 
 * @param {object} props                          - ComponentUseToggle options.
 * @param {string} props.label                    - Usually component name.
 * @param {Array} props.options                   - Options to display
 * @param {function} props.options.onClick        - Fires when an option is clicked.
 * @param {string} props.options.label            - Option description.
 * @param {boolean} props.options.isActive        - Boolean to determine if the current option is active.
 * @param {React.Component?} [props.options.icon] - Icon beside the option.
 */
export const SimpleVerticalSingleSelect = ({
	label,
	options,
}) => {
	return (
		<BaseControl label={label}>
			<div className='es-simple-v-single-select'>
				{options.map(({ onClick, icon, label, isActive }, index) => (
					<Button
						key={index}
						onClick={onClick}
						icon={icon}
						iconSize={24}
						isPressed={isActive}
					>
						{label}
					</Button>
				))}
			</div>
		</BaseControl>
	);
}
