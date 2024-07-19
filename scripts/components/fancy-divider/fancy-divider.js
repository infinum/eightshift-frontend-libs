import React from 'react';
import { Spacer } from '@eightshift/ui-components';

/**
 * @deprecated Use `Spacer` from `@eightshift/ui-components` instead.
 *
 * A simple <hr /> replacement that draws text and an optional icon.
 *
 * @param {object} props - FancyDivider options.
 * @param {React.Component?} [props.icon] - If provided, icon shown on the divider.
 * @param {string} props.label - Label shown on the divider.
 * @param {React.Component?} [props.subtitle] - If provided, subtitle shown on the divider.
 * @param {string?} [props.additionalClasses] - Allows passing through extra classes.
 */
export const FancyDivider = (props) => {
	const {
		icon,
		label,
		subtitle,

		additionalClasses,
	} = props;

	<Spacer
		icon={icon}
		text={label}
		subtitle={subtitle}
		className={additionalClasses}
		border
	/>;
};
