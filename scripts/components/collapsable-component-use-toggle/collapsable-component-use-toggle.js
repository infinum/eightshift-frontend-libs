import React, { useState } from 'react';
import { ToggleControl, Button, BaseControl } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

/**
 * A ComponentUseToggle with collapsable content.
 * 
 * @param {object} props                       - ComponentUseToggle options.
 * @param {string} props.label                 - Usually component name.
 * @param {boolean} props.checked              - Is the component currently in use.
 * @param {boolean} props.disabled             - Is the component currently disabled.
 * @param {function} props.onChange            - `onChange` handler from the `ToggleSwitch`.
 * @param {React.Component} props.children     - Child items that are shown when expanded.
 * @param {boolean} [props.showUseToggle=true] - If `true`, the use toggle is shown.
 * @param {boolean} [props.showLabel=true]     - If `true` and the toggle is not visible, the label will be shown.
 * @param {boolean} [props.startOpen=false]    - If `true`, the options are initially expanded.
 */
export const CollapsableComponentUseToggle = ({
	label,
	checked,
	onChange,
	showUseToggle = true,
	showLabel = true,
	startOpen = false,
	disabled = false,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	const areChildrenExpanded = ((showUseToggle && checked && isOpen) || (!showUseToggle && isOpen));

	const componentClasses = classnames([
		'es-collapsable-component-use-toggle',
		areChildrenExpanded ? 'is-open' : '',
	]);

	return (
		<BaseControl className={componentClasses}>
			<div className='es-collapsable-component-use-toggle__trigger'>
				{showUseToggle &&
					<ToggleControl
						label={label}
						checked={checked}
						onChange={onChange}
						className='es-icon-toggle es-icon-toggle--reverse es-collapsable-component-use-toggle__toggle'
						disabled={disabled}
					/>
				}

				{!showUseToggle && showLabel && label && <span className='es-collapsable-component-use-toggle__label'>
					{label}
				</span>}

				<Button
					isTertiary
					onClick={() => setIsOpen(!isOpen)}
					className='es-collapsable-component-use-toggle__expander'
					icon={!checked ? icons.chevronDown : (isOpen ? icons.chevronUp : icons.chevronDown)}
					disabled={disabled || (showUseToggle && !checked)}
				/>
			</div>

			{areChildrenExpanded && children}
		</BaseControl>
	);
}
