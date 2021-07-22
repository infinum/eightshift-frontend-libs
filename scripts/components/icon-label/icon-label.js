import React from 'react';
import { Icon } from '@wordpress/components';

/**
 * A simple icon-label combo for streamlined components.
 * 
 * @param {React.Component} props.icon  - Icon to display.
 * @param {React.Component} props.label - Label to display.
 */
export const IconLabel = ({ label, icon }) => (
	<>
		<Icon icon={icon} />
		{label}
	</>
);
