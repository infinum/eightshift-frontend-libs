import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, AnimatedContentVisibility, Control, classnames } from '@eightshift/frontend-libs/scripts';

/**
 * A collapsable container for options.
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

	return (
		<Control
			label={label}
			noBottomSpacing={noBottomSpacing}
			additionalClasses={classnames('es-nested-collapsable', isOpen && 'is-open', additionalClasses)}
			actions={
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
					icon={isOpen ? icons.caretDownFill : icons.caretDown}
					label={isOpen ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
					showTooltip
				/>
			}
		>
			<AnimatedContentVisibility showIf={isOpen}>
				{children}
			</AnimatedContentVisibility>
		</Control>
	);
};
