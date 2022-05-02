import React from 'react';
import { CompactResponsive } from '../compact-responsive/compact-responsive';

/**
 * A component that displays options adjustable across screen sizes beautifully.
 * 
 * @param {object} props          - Heading level picker options.
 * @param {string?} [props.label] - Label displayed above the picker.
 * @param {array} props.children  - Items to show. First item is always visible, the rest are visible when the button is toggled.
 */
export const Responsive = (props) => {
	const {
		label,
		children = [],
	} = props;

	return (
		<CompactResponsive label={label} hideBreakpointLabels>
			{children}
		</CompactResponsive>
	);
};
