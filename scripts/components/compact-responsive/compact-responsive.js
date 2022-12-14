import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { AnimatedContentVisibility, Control } from '../shared';
import { classnames, getDefaultBreakpointNames } from '../../helpers';
import { icons, ucfirst } from '../../editor';
import { FancyDivider } from '../fancy-divider/fancy-divider';

/**
 * A component that displays options adjustable across screen sizes.
 *
 * @param {object} props                                                         - CompactResponsive options.
 * @param {React.Component} props.label                                          - Option label.
 * @param {React.Component?} [props.help]                                        - Optional help text to show below the component.
 * @param {React.Component} props.icon                                           - Option icon.
 * @param {array} props.children                                                 - Items to show.
 * @param {array<string>} [props.breakpoints]                                    - Breakpoints to show (default: `large`, `desktop`, `tablet` and `mobile`)
 * @param {array<string>} [props.breakpointLabels]                               - If provided, labels for breakpoints will use the provided names instead of using the breakpoint name itself.
 * @param {string?} [props.additionalClasses]                                    - If provided, passes additional classes through to the component.
 * @param {boolean} [props.noBottomSpacing=false]                                - If `true`, the default bottom spacing is removed.
 * @param {array<{callback: function, isActive: boolean}>} [props.inheritButton] - If provided, an 'Inherit' button is shown on each breakpoint except the first one. For each breakpoint a `callback` function (function that sets/unsets the "inherit" value, usually `undefined`) and a `isActive` flag (`true` if inheriting from parent) need to be provided.
 */
export const CompactResponsive = (props) => {
	const {
		label,
		help,
		icon,

		children = [],

		breakpoints = getDefaultBreakpointNames(),

		inheritButton,
		breakpointLabels,
		additionalClasses,

		noBottomSpacing = false,
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [current, setCurrent] = useState(0);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		setCurrent(isOpen ? 0 : -1);
	};

	return (
		<Control
			icon={icon}
			label={label}
			help={help}
			additionalClasses={classnames('es-nested-collapsable', isOpen && 'is-open', additionalClasses)}
			noBottomSpacing={noBottomSpacing}
			actions={
				<Button
					label={isOpen ? __('Close responsive overrides', 'eightshift-frontend-libs') : __('Open responsive overrides', 'eightshift-frontend-libs')}
					onClick={toggleOpen}
					className={`es-transition-colors es-button-icon-24 es-rounded-1.5 es-h-7! es-py-0! es-pr-0.5! es-pl-1.5! ${isOpen ? 'es-nested-color-pure-white es-bg-admin-accent' : ''}`}
					showTooltip
				>
					{icons.responsiveOverridesAlt}
					<div className={`es-button-icon-24 es-h-flex es-has-animated-y-flip-icon ${isOpen ? 'is-active' : ''}`}>
						{isOpen ? icons.caretDownFill : icons.caretDown}
					</div>
				</Button>
			}
		>
			{children.map((child, index) => {
				let showChild = true;

				if (inheritButton && index > 0 && inheritButton[index].isActive) {
					showChild = false;
				}

				const breakpointLabel = breakpointLabels?.[index] ?? (ucfirst(index === 0 ? `${breakpoints[0]} (${__('Default', 'eightshift-frontend-libs')})` : breakpoints[index]));

				return (
					<div key={index}>
						<AnimatedContentVisibility showIf={current === -1} additionalContainerClasses='es-w-full'>
							<FancyDivider icon={icons[`screen${ucfirst(breakpoints[index])}`]} label={breakpointLabel} />
						</AnimatedContentVisibility>

						{index === 0 && child}

						<AnimatedContentVisibility showIf={index > 0 && current === -1 && inheritButton !== undefined} additionalContainerClasses='es-w-full'>
							<Button
								onClick={inheritButton[index].callback}
								className={classnames([
									'es-transition-colors es-text-align-left es-rounded-1.5 es-nested-m-0! es-gap-2! es-animated-inherit-icon es-w-full es-pl-0! es-pr-2! es-py-5!',
									inheritButton[index].isActive ? 'is-inherited es-nested-color-admin-accent es-border-transparent' : 'es-border-cool-gray-200',
									!inheritButton[index].isActive ? 'es-mb-3' : '',
								])}
								icon={icons.inherit}
							>
								{inheritButton[index].isActive &&
									<span className='es-text-3 es-color-cool-gray-600'>
										{__('Using value from ', 'eightshift-frontend-libs')} <strong>{ucfirst(breakpoints?.[index - 1])}</strong>
										<br />
										<span className='es-text-2.5 es-color-cool-gray-450'>{__('Click to set value ', 'eightshift-frontend-libs')}</span>
									</span>
								}

								{!inheritButton[index].isActive &&
									<span className='es-color-cool-gray-600'>
										{__('Use value from ', 'eightshift-frontend-libs')} <strong>{ucfirst(breakpoints?.[index - 1])}</strong>
									</span>
								}
							</Button>
						</AnimatedContentVisibility>

						<AnimatedContentVisibility showIf={showChild && index > 0 && current === -1} additionalContainerClasses='es-w-full'>
							{child}
						</AnimatedContentVisibility>
					</div>
				);
			})}
		</Control>
	);
};
