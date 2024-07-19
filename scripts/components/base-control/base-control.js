import React from 'react';
import { BaseControl } from '@eightshift/ui-components';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @deprecated Use `BaseControl` from `@eightshift/ui-components` instead.
 *
 * @param {object} props - Control options.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.label] - Label to show above component.
 * @param {React.Component?} [props.subtitle] - Subtitle below the label.
 * @param {React.Component?} [props.actions] - Actions to show to the right of the label.
 * @param {React.Component?} [props.help] - Help to show below the control.
 * @param {React.Component?} [props.children] - Content to show.
 * @param {string?} [props.additionalClasses] - Classes to add to the control base.
 * @param {string?} [props.additionalLabelClasses] - Classes to add to the control label.
 * @param {boolean?} [props.inlineLabel=false] - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 */
export const Control = (props) => {
	const {
		icon,
		label,
		subtitle,

		actions,

		help,

		children,

		inlineLabel = false,

		additionalClasses,
		additionalLabelClasses,
	} = props;

	return (
		<BaseControl
			icon={icon}
			label={label}
			subtitle={subtitle}
			actions={actions}
			help={help}
			inline={inlineLabel}
			className={additionalClasses}
			labelClassName={additionalLabelClasses}
		>
			{children}
		</BaseControl>
	)
};
