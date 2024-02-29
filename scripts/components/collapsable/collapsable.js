import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, AnimatedContentVisibility, Control, classnames } from '@eightshift/frontend-libs/scripts';

/**
 * A collapsable container for options.
 *
 * @param {object} props                              - Collapsable options.
 * @param {React.Component?} [props.icon]             - Icon to show next to the label
 * @param {string} props.label                        - Trigger label.
 * @param {React.Component?} [props.subtitle]         - Subtitle below the label.
 * @param {boolean} [props.noBottomSpacing]           - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]     - If `true`, space below the control is reduced.
 * @param {React.Component} props.children            - Child items that are shown when expanded.
 * @param {string?} [props.additionalClasses]         - If passed, the classes are appended to the component classes.
 * @param {React.Component?} [props.actions]          - Actions to show to the right of the label.
 * @param {boolean} [props.keepActionsOnExpand=false] - If `true`, the actions are kept visible when the component is expanded.
 * @returns
 */
export const Collapsable = ({
	icon,
	label,
	subtitle,

	noBottomSpacing,
	reducedBottomSpacing,

	children,
	additionalClasses,

	actions,

	keepActionsOnExpand = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Control
			icon={icon}
			label={label}
			subtitle={subtitle}
			noBottomSpacing={!isOpen && noBottomSpacing}
			reducedBottomSpacing={!isOpen && reducedBottomSpacing}
			additionalClasses={classnames('es-nested-collapsable', isOpen && 'is-open', additionalClasses)}
			additionalLabelClasses={classnames(noBottomSpacing && !isOpen && 'es-mb-0!')}
			actions={
				<div className='es-h-spaced es-gap-0!'>
					<div className={classnames(
						'es-transition-opacity es-pr-2.5 es-mr-1 es-border-r-cool-gray-100',
						!keepActionsOnExpand && isOpen && 'es-opacity-0'
					)}>
						{actions}
					</div>

					<Button
						onClick={() => setIsOpen(!isOpen)}
						className={classnames(
							'es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1! es-has-animated-y-flip-icon es-pl-0.5!',
							isOpen && 'is-active es-nested-color-pure-white! es-bg-admin-accent!'
						)}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						label={isOpen ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
						showTooltip
					/>
				</div>
			}
		>
			<AnimatedContentVisibility showIf={isOpen}>
				{children}
			</AnimatedContentVisibility>
		</Control>
	);
};
