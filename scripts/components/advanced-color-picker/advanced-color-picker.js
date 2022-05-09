import React, { useState, useRef } from 'react';
import { Button, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BaseControl, ColorPicker, GradientPicker, __experimentalGradientPicker as GradientPickerOld } from '@wordpress/components';
import { ColorPaletteCustom, icons, IconLabel } from '../../../scripts';
import { SimpleHorizontalSingleSelect } from '@eightshift/frontend-libs/scripts/components/simple-horizontal-single-select/simple-horizontal-single-select';
import { ColorPaletteCustomLayout } from '@eightshift/frontend-libs/scripts/components/color-palette-custom/color-palette-custom';

/**
 * A flexible color picker that allows choice between project colors, custom solid colors or gradients.
 *
 * @param {object} props                    - AdvancedColorPicker options.
 * @param {string?} props.colorProject      - Currently selected project color.
 * @param {string?} props.colorSolid        - Currently selected solid color.
 * @param {string?} props.colorGradient     - Currently selected gradient.
 * @param {string?} props.type              - Currently selected color type.
 * @param {function} props.onChangeProject  - Function called when the project color is changed.
 * @param {function} props.onChangeSolid    - Function called when the solid color is changed.
 * @param {function} props.onChangeGradient - Function called when the gradient is changed.
 * @param {function} props.onChangeType     - Function called when the color type is changed.
 * @param {object} props.globalManifest     - Project's `globalManifest`.
 * @param {Array} [props.types]             - Types of choices to show. The array should have objects in `{label: '', value: ''}` format. Defaults provide 'nothing', 'solid color', 'project color' and 'gradient' options.
 * @param {string?} [props.label]           - Label displayed above the control.
 * @param {string?} [props.help]            - Help text displayed below the control.
 * @param {boolean} [props.disabled=false]  - If `true`, control is disabled.
 */
export const AdvancedColorPicker = (props) => {
	const {
		globalVariables: {
			colors: globalColors,
			gradients: globalGradients,
		},
	} = props.globalManifest;

	const {
		type = '',
		colorProject,
		colorSolid,
		colorGradient,

		colorsProject = globalColors,
		gradients = globalGradients,

		onChangeProject,
		onChangeSolid,
		onChangeGradient,
		onChangeType,

		label = <IconLabel icon={icons.backgroundTypeAlt2} label={__('Background', 'eightshift-frontend-libs')} />,
		help,

		types = [
			{
				label: __('None', 'eightshift-frontend-libs'),
				value: '',
				icon: icons.none,
			},
			{
				label: __('Project color', 'eightshift-frontend-libs'),
				value: 'project',
				icon: icons.paletteColor,
			},
			{
				label: __('Custom color', 'eightshift-frontend-libs'),
				value: 'solid',
				icon: icons.solidColor,
			},
			{
				label: __('Gradient', 'eightshift-frontend-libs'),
				value: 'gradient',
				icon: icons.gradient,
			}
		],

		disabled = false,
	} = props;
	const showProjectColor = types.find(({ value }) => value === 'project') !== undefined;
	const showSolidColor = types.find(({ value }) => value === 'solid') !== undefined;
	const showGradient = types.find(({ value }) => value === 'gradient') !== undefined;

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();

	// GradientPicker implemented in WP version 5.9
	const GradientPickerComponent = GradientPicker ?? GradientPickerOld;

	const getTriggerButtonIcon = () => {
		let style = {};

		if (type === '') {
			style = {
				'--selected-color': 'transparent',
				'--selected-opacity': '1',
				gridColumn: 1,
				gridRow: 1,
			};
		} else {
			let bg = 'transparent';

			if (type === 'project' && colorProject !== 'transparent') {
				bg = `var(--global-colors-${colorProject})`;
			}

			if (type === 'solid') {
				bg = colorSolid;
			}

			style = {
				'--checkerboard-opacity': bg === 'transparent' && type !== 'gradient' ? 1 : 0,
				'--selected-color': bg,
				gridColumn: 1,
				gridRow: 1,
			};
		}

		return React.cloneElement(icons.genericColorSwatch, { style });
	};

	return (
		<BaseControl
			label={
				<div className='es-flex-between'>
					<div className='es-h-center es-line-h-0'>
						{label}
					</div>

					<Button
						onClick={() => setIsOpen(!isOpen)}
						icon={<div className='es-adv-color-picker-icon-container'>
							<div style={{ opacity: type === 'gradient' ? 1 : 0, background: colorGradient }} className='es-adv-color-picker-gradient-icon'></div>

							{getTriggerButtonIcon()}
						</div>}
						ref={ref}
						label={__('Pick a color or gradient', 'redesign')}
						className='es-button-icon-24'
					/>
				</div>
			}
			help={help}
		>
			{isOpen &&
				<Popover
					onClose={() => setIsOpen(false)}
					anchorRef={ref?.current}
					noArrow={false}
					position='middle left'
				>
					<div className='es-popover-content es-h-spaced es-gap-l-important'>
						<div className='es-w-4xl es-mb-auto'>
							<SimpleHorizontalSingleSelect
								value={type}
								options={types}
								onChange={((value) => onChangeType(value))}
								disabled={disabled}
								border='offset'
								alignment='vertical'
							/>
						</div>

						<div className='es-min-w-7xl es-min-h-7xl es-mb-auto'>
							{type === 'project' && showProjectColor && !disabled &&
								<ColorPaletteCustom
									value={colorProject}
									colors={typeof colorsProject == 'undefined' ? globalColors : colorsProject}
									onChange={onChangeProject}
									searchable
									layout={ColorPaletteCustomLayout.LIST_TWO_COL}
								/>
							}

							{type === 'solid' && showSolidColor && !disabled &&
								<ColorPicker
									color={colorSolid}
									onChangeComplete={onChangeSolid}
									disableAlpha
								/>
							}

							{type === 'gradient' && showGradient && !disabled &&
								<GradientPickerComponent
									value={colorGradient}
									onChange={onChangeGradient}
									gradients={gradients}
									colors={typeof gradients == 'undefined' ? globalGradients : gradients}
								/>
							}
						</div>
					</div>
				</Popover>
			}

		</BaseControl>
	);
};
