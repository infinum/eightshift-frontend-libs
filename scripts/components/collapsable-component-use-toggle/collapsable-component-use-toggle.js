import React, { useState } from 'react';
import { ToggleControl, Button, BaseControl } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

/**
 * A ComponentUseToggle with collapsable content.
 * 
 * @param {object} props                            - ComponentUseToggle options.
 * @param {string} props.label                      - Usually component name.
 * @param {boolean} props.checked                   - Is the component currently in use.
 * @param {boolean} props.disabled                  - Is the component currently disabled.
 * @param {function} props.onChange                 - `onChange` handler from the `ToggleSwitch`.
 * @param {React.Component} props.children          - Child items that are shown when expanded.
 * @param {boolean} [props.showUseToggle=true]      - If `true`, the use toggle is shown.
 * @param {boolean} [props.showExpanderButton=true] - If `true`, the expander button is shown.
 * @param {boolean} [props.expandOnChecked=false]   - If `true`, the expander button disabled, use toggle enabled and checked, the contents will expand/collapse depending on the state of the use toggle.
 * @param {boolean} [props.showLabel=true]          - If `true` and the toggle is not visible, the label will be shown.
 * @param {boolean} [props.startOpen=false]         - If `true`, the options are initially expanded.
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
	children,
}) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	const areChildrenExpanded = ((showUseToggle && checked && isOpen) || (!showUseToggle && isOpen)) || (!showExpanderButton && showUseToggle && checked && expandOnChecked);

	const componentClasses = classnames([
		'es-collapsable-component-use-toggle',
		areChildrenExpanded ? 'is-open' : '',
	]);

	if (!showLabel && !showUseToggle) {
		return children;
	}

	const getIcon = () => {
		if (!checked) {
			return icons.chevronDown;
		}

		return isOpen ? icons.chevronUp : icons.chevronDown;
	};

	if (!showUseToggle && !showLabel) {
		return children;
	}

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

				{showExpanderButton &&
					<Button
						isTertiary
						onClick={() => setIsOpen(!isOpen)}
						className='es-collapsable-component-use-toggle__expander'
						icon={getIcon()}
						disabled={disabled || (showUseToggle && !checked)}
					/>
				}
			</div>

			{areChildrenExpanded && children}
		</BaseControl>
	);
};
