import React from 'react';

/**
 * A simple <hr /> replacement that draws text.
 *
 * @param {object} props                      - FancyDivider options.
 * @param {string} props.label                - Label shown on the divider.
 * @param {boolean} [props.lowercase=true]    - If `true`, the label is shown in an alternate, lowercase style.
 * @param {string?} [props.additionalClasses] - Allows passing through extra classes.
 */
export const FancyDivider = (props) => {
	const {
		label,
		lowercase = true,
		additionalClasses,
	} = props;

	return (
		<span className={`es-fancy-divider es-my-6 ${lowercase ? 'es-fancy-divider--lowercase' : ''} ${additionalClasses ?? ''}`}>
			<span>{label}</span>
		</span>
	);
};
