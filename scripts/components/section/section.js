import React from 'react';
import { Expandable, Spacer } from '@eightshift/ui-components';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * Simple section with FancyDivider header.
 *
 * @param {object} props                           - Section options.
 * @param {React.Component?} [props.icon]          - Icon shown on the divider.
 * @param {string} props.label                     - Label shown on the divider.
 * @param {React.Component?} [props.subtitle]      - If provided, a subtitle is added to the label.
 * @param {boolean?} [props.showIf]                - If provided, the section is only shown if the condition is `true`.
 * @param {boolean} [props.collapsable=false]      - If `true`, the section is render as a `Collapsable`.
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

		additionalClasses,
		additionalLabelClasses,

		children,
	} = props;

	if (typeof showIf !== 'undefined' && showIf === false) {
		return null;
	}

	if (collapsable) {
		return (
			<Expandable
				label={label}
				icon={icon}
				subtitle={subtitle}
				contentClassName={additionalClasses}
				labelClassName={additionalLabelClasses}
				noFocusHandling
			>
				{children}
			</Expandable>
		);
	}

	return (
		<>
			<Spacer
				text={label}
				icon={icon}
				subtitle={subtitle}
				className={additionalLabelClasses}
				border
			/>
			<div className={clsx('es:space-y-2.5', additionalClasses)}>{children}</div>
		</>
	);
};
