import React from 'react';
import classnames from 'classnames';

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
		<span className={classnames(['es-fancy-divider', lowercase ? 'es-fancy-divider--lowercase' : '', additionalClasses ?? ''])}>
			<span>{label}</span>
		</span>
	);
};
