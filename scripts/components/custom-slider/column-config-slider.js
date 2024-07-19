import React from 'react';
import { ColumnConfigSlider as EsUicColumnConfigSlider } from '@eightshift/ui-components';

/**
 * @deprecated Use `ColumnConfigSlider` from `@eightshift/ui-components` instead.
 *
 * A custom range slider for configuring column width & offset.
 *
 * @param {object} props                                    - ColumnConfigSlider options.
 * @param {Number} [props.numOfColumns=12]                  - Maximum value of the slider.
 * @param {Number[]} [props.value]                          - Current value of the slider.
 * @param {function} [props.onChange]                       - Function to trigger when the value of the slider is changing.
 * @param {React.Component?} [props.icon]                   - Icon to show next to the label
 * @param {React.Component?} [props.help]                   - Help to show below the control.
 * @param {React.Component?} [props.label]                  - Label to show above component.
 * @param {React.Component?} [props.subtitle]               - Subtitle below the label.
 * @param {React.Component[]?} [props.actions]              - Actions to show to the right of the label.
 * @param {boolean} [props.disabled=false]                  - If `true`, the component is disabled.
 * @param {boolean} [props.noWidthHandle=false]             - If `true`, the width handle is not shown.
 * @param {boolean} [props.noOffsetHandle=false]            - If `true`, the offset handle is not shown.
 * @param {React.Component} [props.additionalControlsAbove] - If passed, the controls are shown above the slider.
 * @param {React.Component} [props.additionalControlsBelow] - If passed, the controls are shown below the slider.
 * @param {function} [props.onAfterChange]                  - Function to trigger when the value of the slider is changed.
 */
export const ColumnConfigSlider = (props) => {
	const {
		// Basics
		numOfColumns = 12,

		value,
		onChange,

		// Base control
		icon,
		help,
		label,
		actions,
		subtitle,

		// Behavior
		disabled,
		noWidthHandle = false,
		noOffsetHandle = false,

		// Additions.
		additionalControlsAbove,
		additionalControlsBelow,

		onAfterChange,
	} = props;

	return (
		<>
			{additionalControlsAbove}
			<EsUicColumnConfigSlider
				columns={numOfColumns}
				value={value}
				onChange={onChange}
				icon={icon}
				help={help}
				label={label}
				actions={actions}
				subtitle={subtitle}
				disabled={disabled}
				disableOffset={noOffsetHandle}
				disableWidth={noWidthHandle}
				onChangeEnd={onAfterChange}
			/>
			{additionalControlsBelow}
		</>
	);
};
