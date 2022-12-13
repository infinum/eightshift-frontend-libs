import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Animate } from '@wordpress/components';
import { IconLabel, icons, ucfirst, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

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

		// Should only be used for compatibility with old Responsive.
		hideBreakpointLabels = false,
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [current, setCurrent] = useState(0);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		setCurrent(isOpen ? 0 : -1);
	};

	return (
		<div className={`es-nested-collapsable ${isOpen ? 'is-open' : ''} ${noBottomSpacing ? '' : 'es-mb-3 es-pb-0.25'} ${additionalClasses ?? ''}`}>
			<div className='es-h-between es-w-full es-h-7 es-mb-3'>
				<IconLabel icon={icon} label={label} standalone />

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
			</div>

			{children.map((child, index) => {
				let showChild = true;

				if (inheritButton && index > 0 && inheritButton[index].isActive) {
					showChild = false;
				}

				const breakpointLabel = breakpointLabels?.[index] ?? (ucfirst(index === 0 ? `${breakpoints[0]} (${__('Default', 'eightshift-frontend-libs')})` : breakpoints[index]));

				return (
					<div key={index}>
						{current === -1 && !hideBreakpointLabels &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={`${className} es-w-full es-mt-3 es-mb-1.5 es-h-spaced es-color-cool-gray-800`}>
										<div className='es-display-flex es-button-square-24 es-button-icon-20 es-rounded-0.75 es-bg-cool-gray-500 es-nested-color-pure-white es-line-h-0'>
											{icons[`screen${ucfirst(breakpoints[index])}`]}
										</div>

										<span>{breakpointLabel}</span>
									</div>
								)}
							</Animate>
						}

						{index === 0 && child}

						{index > 0 && current === -1 && inheritButton !== undefined &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={`${className} es-w-full`}>
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
									</div>
								)}
							</Animate>
						}

						{showChild && index > 0 && current === -1 &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={`${className} es-w-full`}>
										{child}
									</div>
								)}
							</Animate>
						}
					</div>
				);
			})}

			{help &&
				<span>{help}</span>
			}
		</div>
	);
};
