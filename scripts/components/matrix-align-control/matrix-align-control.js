import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Control, OptionSelector, PopoverWithTrigger, TileButton } from '../../../scripts';
import { icons } from '@eightshift/ui-components/icons';
import { camelCase, upperFirst } from '@eightshift/ui-components/utilities';

/**
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`.
 *
 * @typedef {'wp'|'tileButton'|'inline'} MatrixAlignControlType
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - MatrixAlignControl options.
 * @param {MatrixAlignControlType} [props.type='wp']          - Style of the option trigger. `wp` replicates the default Gutenberg control, `tileButton` shows a regular button that fits with a `tileButton` IconToggle well.
 * @param {'3x3'|'2x2'} [props.size='3x3']                    - Defines the matrix size to show. Can be either `3x3` or `2x2`.
 * @param {React.Component?} [props.label]                    - Label displayed on the trigger button. (tooltip when style is `wp`, text label below icon when style is `tileButton`)
 * @param {string} props.value                                - Current value.
 * @param {function} [props.onChange]                         - Function that is called on every value change.
 * @param {string?} [props.additionalTriggerClasses]          - If provided, the classes are appended to the trigger button.
 * @param {React.Component?} [props.icon]                     - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                 - Subtitle below the label.
 * @param {boolean?} [props.noBottomSpacing]                  - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing]             - If `true`, space below the control is reduced.
 * @param {AppearOrigin} [props.popoverPosition='top center'] - Position where the popover appears.
 */
export const MatrixAlignControl = (props) => {
	const {
		type = 'wp',
		size = '3x3',
		label = __('Position', 'eightshift-frontend-libs'),

		value,
		onChange,
		additionalTriggerClasses,

		icon,
		subtitle,
		noBottomSpacing,
		reducedBottomSpacing,

		popoverPosition,
	} = props;
	const [currentValue, setCurrentValue] = useState(value);

	const allSizeOptions = [
		{
			value: 'top left',
			label: __('Top-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'top center',
			label: __('Top-center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'top right',
			label: __('Top-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'center left',
			label: __('Center-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'center center',
			label: __('Center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'center right',
			label: __('Center-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'bottom left',
			label: __('Bottom-left', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
		{
			value: 'bottom center',
			label: __('Bottom-center', 'eightshift-frontend-libs'),
			availableOn: ['3x3']
		},
		{
			value: 'bottom right',
			label: __('Bottom-right', 'eightshift-frontend-libs'),
			availableOn: ['3x3', '2x2']
		},
	];

	// Set icons for (in)active options.
	const sizeOptions = allSizeOptions.filter(({ availableOn }) => availableOn.includes(size)).map((item) => ({
		...item,
		icon: item.value === currentValue ? icons.matrixAlignControlDotActive : icons.matrixAlignControlDotInactive,
	}));

	const mainControl = (
		<PopoverWithTrigger
			additionalCloseActions={() => onChange(currentValue)}
			contentClass='es-p-1'
			position={popoverPosition ?? (type === 'inline' ? 'middle right' : 'bottom right')}
			trigger={
				({ ref, setIsOpen, isOpen }) => {
					if (type === 'wp' || type === 'inline') {
						return (
							<Button
								className={additionalTriggerClasses}
								onClick={() => setIsOpen(!isOpen)}
								ref={ref}
								label={label}
								icon={icons[`position${size}${upperFirst(camelCase(currentValue))}`]}
							/>
						);
					}

					return (
						<TileButton
							ref={ref}
							label={label}
							onClick={() => setIsOpen(!isOpen)}
							icon={icons[`position${size}${upperFirst(camelCase(currentValue))}`]}
							additionalClasses={additionalTriggerClasses}
						/>
					);
				}
			}
		>
			<OptionSelector
				options={sizeOptions}
				onChange={(value) => {
					setCurrentValue(value);
					onChange(value);
				}}
				value={currentValue ?? (size === '3x3' ? 'center center' : 'top left')}
				border='none'
				alignment='center'
				additionalClass={size === '3x3' ? 'es-w-28!' : 'es-w-19!'}
				additionalButtonClass='es-rounded-1!'
				noBottomSpacing
				iconOnly
			/>
		</PopoverWithTrigger>
	);

	if (type === 'inline') {
		return (
			<Control
				label={label}
				icon={icon}
				subtitle={subtitle}
				noBottomSpacing={noBottomSpacing}
				reducedBottomSpacing={reducedBottomSpacing}
				inlineLabel
			>
				{mainControl}
			</Control>
		);
	}

	return mainControl;
};
