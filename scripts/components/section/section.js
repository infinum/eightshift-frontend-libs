import React from 'react';
import { FancyDivider } from '../fancy-divider/fancy-divider';

/**
 * Simple section with FancyDivider header.
 *
 * @param {object} props                           - Section options.
 * @param {string} props.label                     - Label shown on the divider.
 * @param {React.Component?} [props.icon]          - Icon shown on the divider.
 * @param {string?} [props.additionalClasses]      - Allows passing through extra classes.
 * @param {string?} [props.additionalLabelClasses] - Allows passing through extra classes to the label.
 */
export const Section = (props) => {
	const {
		label,
		icon,

		additionalClasses,
		additionalLabelClasses,

		children,
	} = props;

	return (
		<div className={additionalClasses}>
			<FancyDivider label={label} icon={icon} additionalClasses={additionalLabelClasses} />

			{children}
		</div>
	);
};
