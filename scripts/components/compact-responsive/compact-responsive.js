import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Animate } from '@wordpress/components';
import { IconLabel, icons, ucfirst } from '../../../scripts';

/**
 * A component that displays options adjustable across screen sizes.
 * 
 * @param {object} props                                                         - Compact responsive options.
 * @param {React.Component} props.label                                          - Option label.
 * @param {React.Component} props.icon                                           - Option icon.
 * @param {array} props.children                                                 - Items to show.
 * @param {array<string>} [props.breakpoints]                                    - Breakpoints to show (default: `large`, `desktop`, `tablet` and `mobile`)
 * @param {array<string>} [props.breakpointLabels]                               - If provided, labels for breakpoints will use the provided names instead of using the breakpoint name itself.
 * @param {array<{callback: function, isActive: boolean}>} [props.inheritButton] - If provided, an 'Inherit' button is shown on each breakpoint except the first one. For each breakpoint a `callback` function (function that sets/unsets the "inherit" value, usually `undefined`) and a `isActive` flag (`true` if inheriting from parent) need to be provided.
 */
export const CompactResponsive = (props) => {
	const {
		label,
		icon,
		children = [],
		breakpoints = ['large', 'desktop', 'tablet', 'mobile'],
		inheritButton,
		breakpointLabels,

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
			className={['es-compact-responsive', isOpen ? 'is-open' : '']}
			label={
				<div className='es-flex-between'>
					<IconLabel icon={icon} label={label} standalone />

					<Button
						label={isOpen ? __('Close responsive overrides', 'eightshift-frontend-libs') : __('Open responsive overrides', 'eightshift-frontend-libs')}
						icon={icons.caretDown}
						onClick={toggleOpen}
						className='es-button-icon-24 es-compact-responsive-trigger'
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
								{({ className: customClass }) => (
									<div className={`es-flex-between ${customClass}`}>
										<div className='es-compact-responsive-breakpoint-label'>
											<i>{icons[`screen${ucfirst(breakpoints[index])}`]}</i>
											<span>{breakpointLabel}</span>
											<hr />
										</div>

										{index > 0 && inheritButton !== undefined &&
											<Button
												onClick={inheritButton[index].callback}
												className={['es-compact-responsive-inherit-button es-button-icon-24 es-slight-button-border', inheritButton[index].isActive ? 'is-inherited' : '']}
												iconPosition='right'
												isTertiary={inheritButton[index].isActive}
												icon={icons.inherit}
												text={inheritButton[index].isActive ? __('Inherited', 'eightshift-frontend-libs') : __('Inherit', 'eightshift-frontend-libs')}
											/>
										}
									</div>
								)}
							</Animate>
						}
					>
						{index === 0 && child}

						{(showChild && index > 0 && current === -1) &&
							<Animate type='slide-in' options={{ origin: 'bottom' }} >
								{({ className }) => (
									<div className={className}>
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
