import React from 'react';
import { RichLabel } from '@eightshift/ui-components';

/**
 * @deprecated Use `RichLabel` from `@eightshift/ui-components` instead.
 *
 * A simple icon-label combo for streamlined components.
 *
 * @param {object} props - IconLabel options.
 * @param {React.Component} props.label - Label to display.
 * @param {React.Component} props.icon - Icon to display.
 * @param {React.Component?} [props.subtitle] - Label to display.
 * @param {boolean} [props.additionalClasses] - If set and `standalone`, provided classes will be passed to the component.
 */
export const IconLabel = (props) => {
	const { label, icon, subtitle, additionalClasses } = props;

	return (
		<RichLabel
			icon={icon}
			label={label}
			subtitle={subtitle}
			className={additionalClasses}
		/>
	);
};
