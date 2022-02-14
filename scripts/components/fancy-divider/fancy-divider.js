import React from 'react';

/**
 * A simple <hr /> replacement that draws text.
 * 
 * @param {object} props       - FancyDivider options.
 * @param {string} props.label - Label shown on the divider.
 */
export const FancyDivider = (props) => {
	const {
		label,
	} = props;

	return (
		<span className='es-fancy-divider'>
			<span>{label}</span>
		</span>
	);
};
