import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Animate } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * A component use toggle with collapsable content.
 *
 * @param {object} props                          - CollapsableComponentUseToggle options.
 * @param {string} props.label                    - Usually component name.
 * @param {boolean} props.checked                 - Is the component currently in use.
 * @param {function} props.onChange               - `onChange` handler from the `ToggleSwitch`.
 * @param {boolean} [props.disabled=false]        - Is the component currently disabled.
 * @param {boolean} [props.noLabel=false]         - If `true`, the label is not shown.
 * @param {boolean} [props.noUseToggle=false]     - If `true`, the use toggle is not shown.
 * @param {boolean} [props.noExpandButton=false]  - If `true`, the expand button is not shown.
 * @param {boolean} [props.noBottomSpacing=false] - If `true`, the expand button is not shown.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the component classes.
 * @param {React.Component} props.children        - Child items that are shown when expanded.
 */
export const CollapsableComponentUseToggle = ({
	label,
	checked,
	onChange,

	disabled = false,

	noLabel = false,
	noUseToggle = false,
	noExpandButton = false,

	noBottomSpacing = false,

	additionalClasses,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	if (noLabel && noUseToggle && noExpandButton) {
		return children;
	}

	const toggleIcon = React.cloneElement(icons.toggleOff, {
		className: `has-full-color-off-state ${checked ? 'is-active' : ''}`,
	});

	if (noExpandButton && noUseToggle && !noLabel) {
		return (
			<BaseControl className={additionalClasses ?? ''} label={label}>
				{children}
			</BaseControl>
		);
	}

	if (noUseToggle && !noLabel && !noExpandButton) {
		return (
			<div className={`es-nested-collapsable ${isOpen ? 'is-open' : ''} ${noBottomSpacing ? '' : 'es-mb-3 es-pb-0.25'} ${additionalClasses ?? ''}`}>
				<div className='es-h-between es-w-full es-h-7 es-mb-3'>
					<div>
						{label}
					</div>

					<Button
						onClick={() => setIsOpen(!isOpen)}
						className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						disabled={disabled || !checked}
						label={isOpen ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
						showTooltip
					/>
				</div>

				{isOpen &&
					<Animate type='slide-in' options={{ origin: 'bottom' }} >
						{({ className }) => (
							<div className={className}>
								{children}
							</div>
						)}
					</Animate>
				}
			</div>
		);
	}

	const openCondition = noExpandButton ? checked : checked && isOpen;

	return (
		<div className={`es-nested-collapsable ${isOpen ? 'is-open' : ''} ${noBottomSpacing ? '' : `${noExpandButton ? 'es-mb-6' : 'es-mb-3'} es-pb-0.25`} ${additionalClasses ?? ''}`}>
			<div className='es-h-between es-w-full es-h-7 es-mb-3'>
				<Button
					icon={toggleIcon}
					onClick={() => {
						onChange(!checked);
						setIsOpen(false);
					}}
					disabled={disabled}
					className={`es-full-color-toggle es-button-icon-24 es-animated-toggle-icon es-p-0! es-flex-shrink-0 es-h-auto! es-gap-2 es-nested-m-0! es-max-w-40 es-text-align-left ${checked ? 'is-checked' : ''}`}
					label={checked ? __('Disable', 'eightshift-frontend-libs') : __('Enable', 'eightshift-frontend-libs')}
					showTooltip
				>
					{label}
				</Button>

				{!noExpandButton &&
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						disabled={disabled || !checked}
						label={checked ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
						showTooltip
					/>
				}
			</div>

			{openCondition &&
				<Animate type='slide-in' options={{ origin: 'bottom' }} >
					{({ className }) => (
						<div className={className}>
							{children}
						</div>
					)}
				</Animate>
			}
		</div>
	);
};
