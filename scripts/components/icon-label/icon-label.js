import React from 'react';
import { Icon } from '@wordpress/components';

/**
 * A simple icon-label combo for streamlined components.
 * 
 * @param {React.Component} props.icon       - Icon to display.
 * @param {React.Component} props.icon       - Icon to display.
 * @param {boolean} [props.standalone=false] - If `true` label is wrapped in div so it can be used by itself.
 */
export const IconLabel = ({ label, icon, standalone = false }) => {
	if (standalone) {
		return (
			<div className='es-label-flex'>
				<Icon icon={icon} />
				{label}
			</div>
		);
	}

	return (
		<>
			<Icon icon={icon} />
			{label}
		</>
	);
};
