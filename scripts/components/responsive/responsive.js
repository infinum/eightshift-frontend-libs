import React, { useState, Fragment } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { getDefaultBreakpointNames } from '../../helpers';
import { icons } from '@eightshift/ui-components/icons';
import { clsx, upperFirst } from '@eightshift/ui-components/utilities';
import {
	AnimatedVisibility,
	BaseControl,
	Button,
	RichLabel,
	ToggleButton,
} from '@eightshift/ui-components';

/**
 * A component that displays options adjustable across screen sizes.
 *
 * @param {object} props                                                         - Responsive options.
 * @param {React.Component} props.label                                          - Option label.
 * @param {React.Component?} [props.help]                                        - Optional help text to show below the component.
 * @param {React.Component} props.icon                                           - Option icon.
 * @param {React.Component?} [props.subtitle]                                    - Subtitle below the label.
 * @param {array} props.children                                                 - Items to show.
 * @param {array<string>} [props.breakpoints]                                    - Breakpoints to show (default: `large`, `desktop`, `tablet` and `mobile`)
 * @param {array<string>} [props.breakpointLabels]                               - If provided, labels for breakpoints will use the provided names instead of using the breakpoint name itself.
 * @param {string?} [props.additionalClasses]                                    - If provided, passes additional classes through to the component.
 * @param {boolean} [props.inline=false]                                         - If `true`, the control is rendered inline and the options are more compact. Having label, subtitle, icon or help on the child component is not advised.
 * @param {array<{callback: function, isActive: boolean}>} [props.inheritButton] - If provided, an 'Inherit' button is shown on each breakpoint except the first one. For each breakpoint a `callback` function (function that sets/unsets the "inherit" value, usually `undefined`) and a `isActive` flag (`true` if inheriting from parent) need to be provided.
 */
export const Responsive = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,

		children = [],

		breakpoints = getDefaultBreakpointNames(),

		inheritButton = [],
		breakpointLabels,
		additionalClasses,

		inline = false,
	} = props;

	const fallbackBreakpointLabels = breakpoints.map((v) => upperFirst(v));

	const [isOpen, setIsOpen] = useState(false);

	return (
		<BaseControl
			icon={icon}
			label={label}
			help={help}
			subtitle={subtitle}
			className={clsx('es-uic-space-y-2' ,additionalClasses)}
			actions={
				<>
					{inline && (
						<AnimatedVisibility visible={!isOpen} transition='scaleFade'>
							{children[0]}
						</AnimatedVisibility>
					)}

					<ToggleButton
						aria-label={
							isOpen
								? __('Close responsive overrides', 'eightshift-frontend-libs')
								: __('Open responsive overrides', 'eightshift-frontend-libs')
						}
						tooltip={
							isOpen
								? __('Close responsive overrides', 'eightshift-frontend-libs')
								: __('Open responsive overrides', 'eightshift-frontend-libs')
						}
						onChange={setIsOpen}
						icon={icons.responsiveOverridesAlt}
					/>
				</>
			}
		>
			{children.map((child, index) => {
				const breakpointLabel =
					breakpointLabels?.at(index) ?? fallbackBreakpointLabels.at(index);
				const previousBreakpointLabel =
					index === 0
						? ''
						: breakpointLabels?.at(index - 1) ??
						  fallbackBreakpointLabels.at(index - 1);
				const breakpointIcon = icons[`screen${upperFirst(breakpoints[index])}`];

				const currentInheritButton = inheritButton?.at(index);

				const inheritButtonComponent = (
					<Button
						icon={icons.inherit}
						onPress={currentInheritButton?.callback}
						className='es-uic-w-full'
						size='large'
					>
						{currentInheritButton?.isActive && (
							<RichLabel
								label={
									<div
										dangerouslySetInnerHTML={{
											__html: sprintf(
												__(
													'Using value from <span class="es-font-weight-600">%s</span>',
													'eightshift-frontend-libs'
												),
												previousBreakpointLabel
											),
										}}
									/>
								}
								subtitle={__('Click to set value ', 'eightshift-frontend-libs')}
							/>
						)}

						{!currentInheritButton?.isActive && (
							<div
								dangerouslySetInnerHTML={{
									__html: sprintf(
										__(
											'Use value from <span class="es-font-weight-600">%s</span>',
											'eightshift-frontend-libs'
										),
										previousBreakpointLabel
									),
								}}
							/>
						)}
					</Button>
				);

				if (inline) {
					if (!isOpen) {
						return null;
					}

					return (
						<AnimatedVisibility
							visible={isOpen}
							className={clsx(
								isOpen && index !== children.length - 1 && 'es-uic-mb-2'
							)}
							key={index}
						>
							<BaseControl
								icon={breakpointIcon}
								label={
									index === 0
										? sprintf(
												__('%s (default)', 'eightshift-frontend-libs'),
												breakpointLabel
										  )
										: breakpointLabel
								}
								actions={
									index > 0 && (
										<AnimatedVisibility
											visible={
												currentInheritButton
													? !currentInheritButton.isActive
													: true
											}
										>
											{child}
										</AnimatedVisibility>
									)
								}
								inlineLabel={index === 0}
							>
								{index === 0 && child}
								{index > 0 && currentInheritButton && inheritButtonComponent}
							</BaseControl>
						</AnimatedVisibility>
					);
				}

				return (
					<Fragment key={index}>
						<AnimatedVisibility visible={isOpen}>
							<RichLabel
								icon={breakpointIcon}
								label={
									index === 0
										? sprintf(
												__('%s (default)', 'eightshift-frontend-libs'),
												breakpointLabel
										  )
										: breakpointLabel
								}
								className='es-uic-mb-2'
							/>

							{index > 0 && currentInheritButton && inheritButtonComponent}
						</AnimatedVisibility>

						{index === 0 && !isOpen && child}

						{index === 0 && isOpen && <div className=''>{child}</div>}

						<AnimatedVisibility
							visible={
								index > 0 &&
								isOpen &&
								(currentInheritButton ? !currentInheritButton.isActive : true)
							}
							className={clsx(
								isOpen && index !== children.length - 1 && 'es-uic-mb-2'
							)}
						>
							{child}
						</AnimatedVisibility>
					</Fragment>
				);
			})}
		</BaseControl>
	);
};
