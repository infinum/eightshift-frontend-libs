import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { ComponentToggle, Spacer } from '@eightshift/ui-components';

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
		onChange: (value) =>
			setAttributes({
				[getAttrKey(attributeName, attributes, manifest)]: value,
			}),
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
 * @param {JSX.Element} props.icon                - Icon to represent the component.
 * @param {string} props.label                    - Usually component name.
 * @param {boolean} props.checked                 - Is the component currently in use.
 * @param {function} props.onChange               - `onChange` handler from the `ToggleSwitch`.
 * @param {boolean} [props.disabled=false]        - Is the component currently disabled.
 * @param {boolean} [props.noLabel=false]         - If `true`, the label is not shown.
 * @param {boolean} [props.noUseToggle=false]     - If `true`, the use toggle is not shown.
 * @param {boolean} [props.noExpandButton=false]  - If `true`, the expand button is not shown.
 * @param {string?} [props.additionalClasses]     - If passed, the classes are appended to the component classes.
 * @param {React.Component} props.children        - Child items that are shown when expanded.
 */
export const UseToggle = ({
	noControls = false,

	icon,
	label,
	checked,
	onChange,

	disabled = false,

	noLabel = false,
	noUseToggle = false,
	noExpandButton = false,

	additionalClasses,
	children,
}) => {
	if (noControls) {
		return null;
	}

	if (noUseToggle && noExpandButton && !noLabel) {
		return (
			<>
				<Spacer size='s' />
				<Spacer
					icon={icon}
					text={label}
				/>
				{children}
			</>
		);
	}

	return (
		<ComponentToggle
			label={label}
			icon={icon}
			useComponent={checked}
			onChange={onChange}
			controlOnly={noLabel && noUseToggle && noExpandButton}
			noUseToggle={noUseToggle}
			expandButtonDisabled={noExpandButton || disabled}
			contentClassName={additionalClasses}
		>
			{children}
		</ComponentToggle>
	);
};
