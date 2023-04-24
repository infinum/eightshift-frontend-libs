import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button, __experimentalNumberControl as ExperimentalNumberControl, NumberControl as StableNumberControl } from '@wordpress/components';
import { Control } from '../base-control/base-control';
import { icons } from '../../editor/icons/icons';
import { classnames } from '../../helpers';

/**
 * A simple number picker, built on the Gutenberg `NumberControl`.
 *
 * @param {object} props                          - NumberPicker options.
 * @param {Number} [props.min=0]                  - Minimum allowed value.
 * @param {Number} props.max                      - Maximum allowed value.
 * @param {Number} [props.step=1]                 - Step change.
 * @param {Number} props.value                    - Current value.
 * @param {function} [props.onChange]             - Function called when the value changes.
 * @param {boolean} [props.disabled=false]        - If `true`, the component is disabled.
 * @param {boolean} [props.noDragToChange=false]  - If `true`, the up/down drag to change value is disabled.
 * @param {React.Component?} [props.icon]         - Icon to show next to the label
 * @param {React.Component?} [props.label]        - Label to show above component.
 * @param {React.Component?} [props.subtitle]     - Subtitle below the label.
 * @param {React.Component?} [props.actions]      - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]         - Help to show below the control.
 * @param {React.Component?} [props.children]     - Content to show.
 * @param {string?} [props.additionalClasses]     - Classes to add to the control base.
 * @param {boolean?} [props.inlineLabel]          - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {boolean?} [props.noBottomSpacing]      - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing] - If `true`, space below the control is reduced.
 * @param {object?} [props.inputField]            - Allows passing raw config data to the `NumberPicker`, e.g. `shiftStep`.
 * @param {string?} [props.placeholder]           - Placeholder to show inside the NumberPicker.
 * @param {Number?} [props.fixedWidth]            - If passed, sets the width of the input field to the provided number of characters. Useful if you have e.g. value from 1 to 1000, but you don't want the input field to change size when on lower values.
 *
 */
export const NumberPicker = (props) => {
	const {
		min = 0,
		max,
		step = 1,
		value,
		onChange,
		disabled = false,

		noDragToChange = false,

		icon,
		help,
		label,
		actions,
		subtitle,
		inlineLabel,
		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,

		inputField,

		placeholder,

		fixedWidth = null,
	} = props;

	const NumberControl = ExperimentalNumberControl ?? StableNumberControl;

	return (
		<Control
			icon={icon}
			help={help}
			label={label}
			actions={actions}
			subtitle={subtitle}
			inlineLabel={inlineLabel}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			additionalClasses={classnames('es-number-picker', additionalClasses)}
		>
			<div className={classnames('es-display-flex es-items-center es-h-8', label && !inlineLabel && '-es-mt-1')}>
				<NumberControl
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(value) => onChange(parseFloat(value))}
					disabled={disabled}
					isDragEnabled={!noDragToChange}
					dragThreshold='20'
					shiftStep={(typeof inputField === 'object' && inputField?.shiftStep > 0) ? inputField.shiftStep : 10}
					isShiftStepEnabled
					spinControls='none'
					hideHTMLArrows
					className='es-number-picker-input-value'
					style={fixedWidth ? { width: `calc(1rem ${min < 0 ? '+ 0.5rem ' : ''} + ${fixedWidth} * 1ch)` } : {}}
					placeholder={placeholder}
					__nextHasNoMarginBottom
				/>

				<div className='es-display-flex es-flex-col es-h-full es-has-enhanced-contrast-icon'>
					<Button
						icon={icons.chevronUp}
						aria-label={__('Increment', 'eightshift-frontend-libs')}
						onClick={() => onChange(Math.min(parseFloat(value) + step), max)}
						className={classnames('es-w-4! es-min-w-4! es-rounded-0! es-rounded-tr-0.75! es-button-icon-10 es-border-y-cool-gray-400! es-border-r-cool-gray-400! es-p-0!', value >= max ? 'es-opacity-100! es-nested-color-cool-gray-100!' : 'es-nested-color-cool-gray-700! es-active-bg-cool-gray-50! es-active-nested-color-admin-accent!')}
						disabled={disabled || value >= max}
					/>
					<Button
						icon={icons.chevronDown}
						aria-label={__('Decrement', 'eightshift-frontend-libs')}
						onClick={() => onChange(Math.max(parseFloat(value) - step, min))}
						className={classnames('es-w-4! es-min-w-4! es-rounded-0! es-rounded-br-0.75! es-button-icon-10 es-border-b-cool-gray-400! es-border-r-cool-gray-400! es-p-0!', value <= min ? 'es-opacity-100! es-nested-color-cool-gray-100!' : 'es-nested-color-cool-gray-700! es-active-bg-cool-gray-50! es-active-nested-color-admin-accent!')}
						disabled={disabled || value <= min}
					/>
				</div>
			</div>
		</Control>
	);
};
