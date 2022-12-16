import React from 'react';
import { classnames } from '../../helpers';
import { IconLabel } from '@eightshift/frontend-libs/scripts';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @param {object} props                           - Control options.
 * @param {React.Component?} [props.icon]          - Icon to show next to the label
 * @param {React.Component?} [props.label]         - Label to show above component.
 * @param {React.Component?} [props.subtitle]      - Subtitle below the label.
 * @param {React.Component?} [props.actions]       - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]          - Help to show below the control.
 * @param {React.Component?} [props.children]      - Content to show.
 * @param {string?} [props.additionalClasses]      - Classes to add to the control base.
 * @param {boolean?} [props.noBottomSpacing=false] - If `true`, space below the control is removed.
 */
export const Control = (props) => {
	const {
		icon,
		label,
		subtitle,

		actions,

		help,

		children,

		additionalClasses,

		noBottomSpacing = false,
	} = props;

	if (!children) {
		return null;
	}

	return (
		<div className={classnames(additionalClasses, !noBottomSpacing && 'es-mb-5')}>
			{label &&
				<div className={classnames('es-mb-2', (icon || subtitle || actions) && 'es-min-h-7', actions && 'es-h-between')}>
					<IconLabel icon={icon} label={label} subtitle={subtitle} standalone />

					{actions}
				</div>
			}

			{children}

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500'>{help}</div>
			}
		</div>
	);
};
