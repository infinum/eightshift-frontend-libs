import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Animate } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

/**
 * A collapsable container for options, akin to CollapsableComponentUseToggle.
 *
 * @param {object} props                          - Collapsable options.
 * @param {string} props.label                    - Trigger label.
 * @param {boolean} [props.noBottomSpacing=false] - If `true`, the default bottom spacing is removed.
 * @param {React.Component} props.children        - Child items that are shown when expanded.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the component classes.
 * @returns
 */
export const Collapsable = ({
	label,

	noBottomSpacing = false,

	children,
	additionalClasses,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const componentClasses = classnames([
		'es-nested-collapsable',
		isOpen ? 'is-open' : '',
		noBottomSpacing ? 'es-pb-0.25' : 'es-mb-5',
		additionalClasses ?? '',
	]);

	return (
		<div className={componentClasses}>
			<div className='es-h-between es-w-full es-h-7 es-mb-2'>
				<div>
					{label}
				</div>

				<Button
					onClick={() => setIsOpen(!isOpen)}
					className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
					icon={isOpen ? icons.caretDownFill : icons.caretDown}
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
};
