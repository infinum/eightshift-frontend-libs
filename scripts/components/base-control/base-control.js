import React from 'react';
import { IconLabel } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @param {object} props                                - Control options.
 * @param {React.Component?} [props.icon]               - Icon to show next to the label
 * @param {React.Component?} [props.label]              - Label to show above component.
 * @param {React.Component?} [props.subtitle]           - Subtitle below the label.
 * @param {React.Component?} [props.actions]            - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]               - Help to show below the control.
 * @param {React.Component?} [props.children]           - Content to show.
 * @param {string?} [props.additionalClasses]           - Classes to add to the control base.
 * @param {string?} [props.additionalLabelClasses]      - Classes to add to the control label.
 * @param {boolean?} [props.inlineLabel=false]          - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {boolean?} [props.noBottomSpacing=false]      - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing=false] - If `true`, space below the control is reduced.
 * @param {function?} [props.wrapChildren]              - If passed (function `(children) => React.Component`), the children are wrapped in the provided element.
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

		noBottomSpacing = false,
		reducedBottomSpacing = false,

		wrapChildren,
	} = props;

	if (!children) {
		return null;
	}

	const bottomSpacingClass = reducedBottomSpacing ? 'es-mb-2' : 'es-mb-5';

	if (inlineLabel) {
		return (
			<div className={clsx(additionalClasses, !noBottomSpacing && bottomSpacingClass)}>
				{label &&
					<div className={clsx('es-h-between', (icon || subtitle) && 'es-min-h-7')}>
						<IconLabel icon={icon} label={label} subtitle={subtitle} standalone />

						{children}
					</div>
				}

				{!label && !wrapChildren && children}
				{!label && wrapChildren && wrapChildren(children)}

				{actions &&
					<div className='es-h-end es-mt-2'>
						{actions}
					</div>
				}

				{help &&
					<div className='es-mt-1 es-text-3 es-color-cool-gray-500 es-line-h-1.25'>{help}</div>
				}
			</div>
		);
	}

	return (
		<div className={clsx(additionalClasses, !noBottomSpacing && bottomSpacingClass)}>
			{(label || actions) &&
				<div className={clsx(
					!inlineLabel && 'es-mb-2', (icon || subtitle || actions) && 'es-min-h-7', actions && 'es-h-between',
					additionalLabelClasses,
				)}>
					{label &&
						<IconLabel icon={icon} label={label} subtitle={subtitle} standalone />
					}

					{actions}
				</div>
			}

			{!wrapChildren && children}
			{wrapChildren && wrapChildren(children)}

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500 es-line-h-1.25'>{help}</div>
			}
		</div>
	);
};
