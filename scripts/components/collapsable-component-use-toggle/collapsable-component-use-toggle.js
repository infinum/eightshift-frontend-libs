import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Animate } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

/**
 * A ComponentUseToggle with collapsable content.
 *
 * @param {object} props                            - ComponentUseToggle options.
 * @param {string} props.label                      - Usually component name.
 * @param {boolean} props.checked                   - Is the component currently in use.
 * @param {boolean} [props.disabled=false]          - Is the component currently disabled.
 * @param {function} props.onChange                 - `onChange` handler from the `ToggleSwitch`.
 * @param {React.Component} props.children          - Child items that are shown when expanded.
 * @param {boolean} [props.showUseToggle=true]      - If `true`, the use toggle is shown.
 * @param {boolean} [props.showExpanderButton=true] - If `true`, the expander button is shown.
 * @param {boolean} [props.expandOnChecked=false]   - If `true`, the expander button disabled, use toggle enabled and checked, the contents will expand/collapse depending on the state of the use toggle.
 * @param {boolean} [props.showLabel=true]          - If `true` and the toggle is not visible, the label will be shown.
 * @param {boolean} [props.startOpen=false]         - If `true`, the options are initially expanded.
 * @param {string?} [props.additionalClasses]       - If passed, the classes are appended to the component classes.
 */
export const CollapsableComponentUseToggle = ({
	label,
	checked,
	onChange,
	showUseToggle = true,
	showLabel = true,
	startOpen = false,
	disabled = false,
	showExpanderButton = true,
	expandOnChecked = false,
	additionalClasses,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	const areChildrenExpanded = ((showUseToggle && checked && isOpen) || (!showUseToggle && isOpen)) || (!showExpanderButton && showUseToggle && checked && expandOnChecked);

	const componentClasses = classnames([
		'es-collapsable-component-use-toggle-v2',
		areChildrenExpanded ? 'is-open' : '',
		showUseToggle ? 'has-use-toggle' : '',
		additionalClasses ?? '',
	]);

	if (!showLabel && !showUseToggle) {
		return children;
	}

	const toggleIcon = React.cloneElement(icons.toggleOff, {
		className: `es-collapsable-component-use-toggle-v2__toggle-button has-full-color-off-state ${checked ? 'is-active' : ''}`,
	});

	return (
		<BaseControl className={componentClasses}>
			<div className='es-collapsable-component-use-toggle-v2__trigger es-h-between'>
				<div className='es-h-spaced'>
					{showUseToggle &&
						<Button
							icon={toggleIcon}
							onClick={() => onChange(!checked)}
							disabled={disabled}
							className='es-button-square-24 es-button-icon-24 es-button-no-outline es-p-0!'
							label={checked ? __('Disable', 'eightshift-frontend-libs') : __('Enable', 'eightshift-frontend-libs')}
							showTooltip
						/>
					}

					{showLabel && label &&
						<span className='es-collapsable-component-use-toggle-v2__label'>
							{label}
						</span>
					}
				</div>

				<div className='es-h-spaced es-collapsable-component-use-toggle-v2__trigger-right'>
					{showExpanderButton &&
						<Button
							onClick={() => setIsOpen(!isOpen)}
							className={`es-collapsable-component-use-toggle-v2__expander-button es-button-square-32 es-button-icon-24 es-rounded-full ${areChildrenExpanded ? 'es-nested-color-admin-accent' : ''}`}
							icon={areChildrenExpanded ? icons.caretDownFill : icons.caretDown}
							disabled={disabled || (showUseToggle && !checked)}
							label={checked ? __('Show options', 'eightshift-frontend-libs') : __('Hide options', 'eightshift-frontend-libs')}
							showTooltip
						/>
					}
				</div>
			</div>

			{(areChildrenExpanded || (!showUseToggle && !showExpanderButton)) &&
				<Animate type='slide-in' options={{ origin: 'bottom' }} >
					{({ className }) => (
						<div className={className}>
							{children}
						</div>
					)}
				</Animate>
			}
		</BaseControl>
	);
};
