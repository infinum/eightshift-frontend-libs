import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { icons, checkAttr, getAttrKey, classnames, AnimatedContentVisibility, Control } from '@eightshift/frontend-libs/scripts';

export const generateUseToggleConfig = (attributes, manifest, attributeName) => {
	const {
		noControls,

		noLabel,
		noUseToggle,
		noExpandButton,

		setAttributes,

		reducedBottomSpacing,
		noBottomSpacing,
		additionalClasses,
	} = attributes;

	const checked = checkAttr(attributeName, attributes, manifest);

	return {
		label: attributes?.label ?? manifest.title,
		checked: checked,
		noLabel: noLabel,
		noUseToggle: noUseToggle,
		noExpandButton: noExpandButton,
		onChange: (value) => setAttributes({ [getAttrKey(attributeName, attributes, manifest)]: value }),
		noControls: noControls,
		noBottomSpacing: noBottomSpacing,
		additionalClasses: additionalClasses,
		reducedBottomSpacing: reducedBottomSpacing,
	};
};

/**
 * A component use toggle with collapsable content.
 *
 * @param {object} props                          - UseToggle options.
 * @param {boolean} [props.noControls=false]      - If `true`, the options are not rendered.
 * @param {string} props.label                    - Usually component name.
 * @param {boolean} props.checked                 - Is the component currently in use.
 * @param {function} props.onChange               - `onChange` handler from the `ToggleSwitch`.
 * @param {boolean} [props.disabled=false]        - Is the component currently disabled.
 * @param {boolean} [props.noLabel=false]         - If `true`, the label is not shown.
 * @param {boolean} [props.noUseToggle=false]     - If `true`, the use toggle is not shown.
 * @param {boolean} [props.noExpandButton=false]  - If `true`, the expand button is not shown.
 * @param {boolean} [props.noBottomSpacing]       - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the component classes.
 * @param {React.Component} props.children        - Child items that are shown when expanded.
 */
export const UseToggle = ({
	noControls = false,

	label,
	checked,
	onChange,

	disabled = false,

	noLabel = false,
	noUseToggle = false,
	noExpandButton = false,

	noBottomSpacing,
	reducedBottomSpacing,

	additionalClasses,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	if (noControls) {
		return null;
	}

	if (noLabel && noUseToggle && noExpandButton) {
		return children;
	}

	const toggleIcon = React.cloneElement(icons.toggleOff, {
		className: `has-full-color-off-state ${checked ? 'is-active' : ''}`,
	});

	if (noExpandButton && noUseToggle && !noLabel) {
		return (
			<Control
				label={label}
				additionalClasses={additionalClasses}
				noBottomSpacing={!isOpen && noBottomSpacing}
				reducedBottomSpacing={!isOpen && reducedBottomSpacing}
			>
				{children}
			</Control>
		);
	}

	if (noUseToggle && !noLabel && !noExpandButton) {
		return (
			<Control
				label={label}
				additionalLabelClasses={classnames(noBottomSpacing && !isOpen && 'es-mb-0!')}
				actions={
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
						icon={isOpen ? icons.caretDownFill : icons.caretDown}
						disabled={disabled || !checked}
						label={isOpen ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
						showTooltip
					/>
				}
				noBottomSpacing={!isOpen && noBottomSpacing}
				reducedBottomSpacing={!isOpen && reducedBottomSpacing}
			>
				<AnimatedContentVisibility showIf={isOpen}>
					{children}
				</AnimatedContentVisibility>
			</Control>
		);
	}

	const openCondition = noExpandButton ? checked : checked && isOpen;

	return (
		<Control
			additionalClasses={classnames('es-nested-collapsable', isOpen && 'is-open', additionalClasses)}
			additionalLabelClasses={classnames(noBottomSpacing && !openCondition && 'es-mb-0!')}
			label={
				<Button
					icon={toggleIcon}
					onClick={() => {
						onChange(!checked);
						setIsOpen(false);
					}}
					disabled={disabled}
					className={classnames('es-full-color-toggle es-button-icon-24 es-animated-toggle-icon es-p-0! es-flex-shrink-0 es-h-auto! es-gap-2 es-nested-m-0! es-max-w-60 es-text-align-left', checked && 'is-checked')}
					label={checked ? __('Disable', 'eightshift-frontend-libs') : __('Enable', 'eightshift-frontend-libs')}
					showTooltip
				>
					{label}
				</Button>
			}
			actions={!noExpandButton &&
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className={`es-transition-colors es-button-square-28 es-button-icon-24 es-rounded-1.5 es-has-animated-y-flip-icon ${isOpen ? 'is-active es-nested-color-pure-white es-bg-admin-accent' : ''}`}
					icon={isOpen ? icons.caretDownFill : icons.caretDown}
					disabled={disabled || !checked}
					label={checked ? __('Hide options', 'eightshift-frontend-libs') : __('Show options', 'eightshift-frontend-libs')}
					showTooltip
				/>
			}
			noBottomSpacing={!isOpen && noBottomSpacing}
			reducedBottomSpacing={!isOpen && reducedBottomSpacing}
		>
			<AnimatedContentVisibility showIf={openCondition}>
				{children}
			</AnimatedContentVisibility>
		</Control>
	);
};
