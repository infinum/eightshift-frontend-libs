import React, { useState, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { classnames, getDefaultBreakpointNames } from '../../helpers';
import { icons, ucfirst } from '../../editor';
import { FancyDivider } from '../fancy-divider/fancy-divider';
import { Control } from '../base-control/base-control';
import { AnimatedContentVisibility } from '../animated-content-visibility/animated-content-visibility';

/**
 * A component that displays options adjustable across screen sizes.
 *
 * @param {object} props                                                         - Responsive options.
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
export const Responsive = (props) => {
	const {
		label,
		help,
		icon,

		children = [],

		breakpoints = getDefaultBreakpointNames(),

		inheritButton = [],
		breakpointLabels,
		additionalClasses,

		noBottomSpacing = false,
	} = props;

	const fallbackBreakpointLabels = breakpoints.map((v) => ucfirst(v));

	const [isOpen, setIsOpen] = useState(false);

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
					onClick={() => setIsOpen(!isOpen)}
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
				const breakpointLabel = breakpointLabels?.at(index) ?? fallbackBreakpointLabels.at(index);
				const previousBreakpointLabel = index === 0 ? '' : breakpointLabels?.at(index - 1) ?? fallbackBreakpointLabels.at(index - 1);
				const breakpointIcon = icons[`screen${ucfirst(breakpoints[index])}`];

				const currentInheritButton = inheritButton?.at(index);

				return (
					<Fragment key={index}>
						<AnimatedContentVisibility showIf={isOpen} additionalContainerClasses={classnames(isOpen && index !== children.length - 1 && 'es-mb-3')}>
							<FancyDivider icon={breakpointIcon} label={index === 0 ? sprintf(__('%s (default)', 'eightshift-frontend-libs'), breakpointLabel) : breakpointLabel} />

							{index > 0 && currentInheritButton &&
								<Button
									icon={icons.inherit}
									onClick={currentInheritButton?.callback}
									className={classnames(
										'es-animated-inherit-icon es-transition-colors es-text-align-left es-nested-m-0! es-gap-1 es-rounded-1 es-py-0 es-px-1 es-h-10 es-mx-0 -es-mt-0.5 es-w-full es-border-cool-gray-200 es-hover-border-cool-gray-400',
										currentInheritButton?.isActive ? 'is-inherited es-nested-color-admin-accent es-mb-0' : 'es-mb-2.5'
									)}
								>
									{currentInheritButton?.isActive &&
										<span className='es-text-3 es-color-cool-gray-600'>
											{ReactHtmlParser(sprintf(__('Using value from <span class="es-font-weight-600">%s</span>', 'eightshift-frontend-libs'), previousBreakpointLabel))}
											<br />
											<span className='es-text-2.5 es-color-cool-gray-450'>{__('Click to set value ', 'eightshift-frontend-libs')}</span>
										</span>
									}

									{!currentInheritButton?.isActive &&
										<span className='es-color-cool-gray-600'>
											{ReactHtmlParser(sprintf(__('Use value from <span class="es-font-weight-600">%s</span>', 'eightshift-frontend-libs'), previousBreakpointLabel))}
										</span>
									}
								</Button>
							}
						</AnimatedContentVisibility>

						{index === 0 && !isOpen && child}

						{index === 0 && isOpen &&
							<div className='es-mb-3'>
								{child}
							</div>
						}

						<AnimatedContentVisibility showIf={index > 0 && isOpen && (currentInheritButton ? !currentInheritButton.isActive : true)} additionalContainerClasses={classnames(isOpen && index !== children.length - 1 && 'es-mb-3')}>
							{child}
						</AnimatedContentVisibility>
					</Fragment>
				);
			})}
		</Control>
	);
};
