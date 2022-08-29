import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Animate } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * A collapsable container for options, akin to CollapsableComponentUseToggle.
 *
 * @param {object} props                      - Collapsable options.
 * @param {string} props.label                - Trigger label.
 * @param {boolean} props.startOpen           - If true, the component is expanded by default. Default: false
 * @param {boolean} props.showExpanderIcon    - If true, the expander icon is rendered. Default: true
 * @param {React.Component} props.children    - Child items that are shown when expanded.
 * @param {string?} [props.additionalClasses] - If passed, the classes are appended to the component classes.
 * @returns
 */
export const Collapsable = ({
	label,
	startOpen = false,
	showExpanderIcon = true,
	children,
	additionalClasses,
}) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	const componentClasses = [
		'es-collapsable-v2',
		isOpen ? 'is-open' : '',
		additionalClasses ?? '',
	];

	return (
		<BaseControl className={componentClasses}>
			<div className='es-collapsable-v2__trigger es-h-between'>
				{label}

				{showExpanderIcon &&
					<Button
						onClick={() => setIsOpen(!isOpen)}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						className={`es-collapsable-v2__expander-button es-button-square-32 es-button-icon-24 es-rounded-full ${isOpen ? 'es-nested-color-admin-accent' : ''}`}
						label={isOpen ? __('Show options', 'eightshift-frontend-libs') : __('Hide options', 'eightshift-frontend-libs')}
						showTooltip
					/>
				}
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
		</BaseControl>
	);
};
