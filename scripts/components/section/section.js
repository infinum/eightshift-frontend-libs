import React from 'react';
import { IconLabel, Collapsable, FancyDivider, classnames } from '@eightshift/frontend-libs/scripts';

/**
 * Simple section with FancyDivider header.
 *
 * @param {object} props                           - Section options.
 * @param {React.Component?} [props.icon]          - Icon shown on the divider.
 * @param {string} props.label                     - Label shown on the divider.
 * @param {React.Component?} [props.subtitle]      - If provided, a subtitle is added to the label.
 * @param {boolean?} [props.showIf]                - If provided, the section is only shown if the condition is `true`.
 * @param {boolean} [props.collapsable=false]      - If `true`, the section is render as a `Collapsable`.
 * @param {boolean} [props.noBottomSpacing]        - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]  - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]      - Allows passing through extra classes.
 * @param {string?} [props.additionalLabelClasses] - Allows passing through extra classes to the label.
 * @param {React.Component} props.children         - Child items that are shown when expanded.
 */
export const Section = (props) => {
	const {
		icon,
		label,
		subtitle,

		showIf,

		collapsable = false,
		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,
		additionalLabelClasses,

		children,
	} = props;

	if (typeof showIf !== 'undefined' && showIf === false) {
		return null;
	}

	if (collapsable) {
		return (
			<Collapsable
				label={
					<IconLabel
						icon={icon}
						label={label}
						subtitle={subtitle}
						additionalClasses={classnames('es-nested-bg-cool-gray-450 es-nested-rounded-1 es-nested-color-pure-white! es-nested-p-0.75 es-color-cool-gray-600 es-has-enhanced-contrast-icon', additionalLabelClasses)}
						standalone
					/>
				}
				noBottomSpacing={noBottomSpacing}
				reducedBottomSpacing={reducedBottomSpacing}
			>
				{children}
			</Collapsable>
		);
	}

	const bottomSpacingValue = reducedBottomSpacing ? 'es-mb-2' : 'es-mb-5';

	return (
		<>
			<FancyDivider label={label} icon={icon} subtitle={subtitle} additionalClasses={additionalLabelClasses} />

			<div className={classnames(!noBottomSpacing && bottomSpacingValue, additionalClasses)}>
				{children}
			</div>
		</>
	);
};
