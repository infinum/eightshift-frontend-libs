import React from 'react';
import { FancyDivider } from '../fancy-divider/fancy-divider';

/**
 * Simple section with FancyDivider header.
 *
 * @param {object} props                           - Section options.
 * @param {string} props.label                     - Label shown on the divider.
 * @param {React.Component?} [props.icon]          - Icon shown on the divider.
 * @param {boolean} [props.noBottomSpacing=false]  - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClasses]      - Allows passing through extra classes.
 * @param {string?} [props.additionalLabelClasses] - Allows passing through extra classes to the label.
 * @param {React.Component} props.children         - Child items that are shown when expanded.
 */
export const Section = (props) => {
	const {
		label,
		icon,

		noBottomSpacing = false,

		additionalClasses,
		additionalLabelClasses,

		children,
	} = props;

	return (
		<>
			<FancyDivider label={label} icon={icon} additionalClasses={additionalLabelClasses} />

			<div className={`${noBottomSpacing ? '' : 'es-mb-5'} ${additionalClasses ?? ''}`}>
				{children}
			</div>
		</>
	);
};
