import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Animate } from '@wordpress/components';
import { IconLabel, icons, ucfirst, getDefaultBreakpointNames, FancyDivider } from '@eightshift/frontend-libs/scripts';
/**
 * A component that displays options adjustable across screen sizes.
 *
 * @param {object} props                                                         - Compact responsive options.
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
		<BaseControl
			className={`es-compact-responsive ${isOpen ? 'is-open' : ''} ${additionalClasses ?? ''}`}
			help={help}
			label={
				<div className='es-flex-between'>
					<IconLabel icon={icon} label={label} standalone />

					<Button
						label={isOpen ? __('Close responsive overrides', 'eightshift-frontend-libs') : __('Open responsive overrides', 'eightshift-frontend-libs')}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						onClick={toggleOpen}
						className='es-button-icon-24 es-compact-responsive-trigger es-rounded-0.75'
						showTooltip
						isTertiary
					>
						{icons.responsiveOverridesAlt}
					</Button>
				</div>
			}
		>
			{children.map((child, index) => {
				let showChild = true;

				if (inheritButton && index > 0 && inheritButton[index].isActive) {
					showChild = false;
				}

				const breakpointLabel = breakpointLabels?.[index] ?? (ucfirst(index === 0 ? `${breakpoints[0]} (${__('Default', 'eightshift-frontend-libs')})` : breakpoints[index]));

				return (
					<BaseControl
						key={index}
						className='es-no-field-spacing'
						label={current === -1 && !hideBreakpointLabels &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={`${className} es-w-full`}>
										<FancyDivider label={<IconLabel icon={icons[`screen${ucfirst(breakpoints[index])}`]} label={breakpointLabel} />} additionalClasses='es-mx-0! es-mt-0! es-mb-1.0!' />
									</div>
								)}
							</Animate>
						}
					>
						{index === 0 && child}

						{index > 0 && current === -1 && inheritButton !== undefined &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={`${className} es-w-full`}>
										<Button
											onClick={inheritButton[index].callback}
											className={`es-compact-responsive-inherit-button es-button-no-icon-spacing es-button-icon-24 es-rounded-0.75 es-text-3 es-h-11! es-px-2.5! es-py-0! es-text-align-left es-gap-2 es-line-h-1.15 -es-mt-0.5 es-w-full ${inheritButton[index].isActive ? 'is-inherited es-slight-button-border-cool-gray-400 es-mb-2 es-nested-color-admin-accent' : 'es-slight-button-border-cool-gray-100 es-mb-4 es-nested-color-cool-gray-600'} ${index === breakpoints.length - 1 && !showChild ? 'es-mb-0!' : ''}`}
											icon={icons.inherit}
										>
											{inheritButton[index].isActive &&
												<span>
													{__('Using value from ', 'eightshift-frontend-libs')} <strong>{ucfirst(breakpoints?.[index - 1])}</strong>
													<br />
													<span className='es-text-2.5 es-opacity-80'>{__('Click to set value ', 'eightshift-frontend-libs')}</span>
												</span>
											}

											{!inheritButton[index].isActive &&
												<span>
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
					</BaseControl>
				);
			})
			}
		</BaseControl>
	);
};
