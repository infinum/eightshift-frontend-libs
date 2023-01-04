import React, { useRef, useLayoutEffect, useState } from 'react';
import { Control } from '../base-control/base-control';
import { renderColumnConfigSliderHandle } from './tooltip-handle';
import { clamp, columnConfigStyleProps } from './shared';
import Slider from 'rc-slider';

/**
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
 * @param {React.Component?[]} [props.actions]              - Actions to show to the right of the label.
 * @param {boolean?} [props.noBottomSpacing=false]          - If `true`, space below the control is removed.
 * @param {boolean} [props.disabled=false]                  - If `true`, the component is disabled.
 * @param {boolean} [props.noWidthHandle=false]             - If `true`, the width handle is not shown.
 * @param {boolean} [props.noOffsetHandle=false]            - If `true`, the offset handle is not shown.
 * @param {string?} [props.additionalClass]                 - If passed, the classes are appended to the slider.
 * @param {React.Component} [props.additionalControlsAbove] - If passed, the controls are shown above the slider.
 * @param {React.Component} [props.additionalControlsBelow] - If passed, the controls are shown below the slider.
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
		noBottomSpacing = false,

		// Behavior
		disabled,
		noWidthHandle = false,
		noOffsetHandle = false,

		// Classes
		additionalClass,

		// Additions.
		additionalControlsAbove,
		additionalControlsBelow,
	} = props;

	const max = numOfColumns + 1;

	// Custom focus state capture to ensure proper focus visuals on the handle.
	const [hasFocus, setHasFocus] = useState(false);

	// Re-calculate height to take markers and other possible customizations into account (to prevent overlaps with other content).
	// The <div> wrapping the Slider is used to get the correct height.
	const [sliderHeight, setSliderHeight] = useState(14);
	const ref = useRef();

	useLayoutEffect(() => {
		const height = ref?.current?.scrollHeight + 2;

		if (height && height >= 14) {
			setSliderHeight(height);
		}
	}, []);

	const columnLabels = [...Array(max - 1).keys()].reduce((all, current) => {
		const labelWidth = `${current + 1}`.length > 1 ? '-2.5ch' : '-2.25ch';

		return {
			...all,
			[current + 2]: {
				style: {
					fontSize: '0.95em',
					color: 'var(--es-admin-gray-500)',
					letterSpacing: '-0.01em',
					top: 36,
					transform: `translateX(${labelWidth})`,
					userSelect: 'none',
				},
				label: current + 1,
			}
		};
	}, {});

	return (
		<Control
			help={help}
			icon={icon}
			label={label}
			subtitle={subtitle}
			noBottomSpacing={noBottomSpacing}
			additionalClasses={additionalClass}
			actions={actions}
		>
			<div className='es-v-spaced es-mt-3 es-items-start!'>
				{additionalControlsAbove &&
					<div className='es-h-end es-w-full'>
						{additionalControlsAbove}
					</div>
				}

				<div ref={ref} className='es-w-full'>
					<Slider
						range

						disabled={disabled || (noWidthHandle && noOffsetHandle)}

						value={value}

						marks={columnLabels}
						dots={false}

						min={1}
						max={max}
						step={2}

						onChange={([o, w]) => {
							if (noOffsetHandle && noWidthHandle) {
								return;
							}

							if (noOffsetHandle) {
								onChange([value[0], w]);
								return;
							}

							if (noWidthHandle) {
								const currentWidth = value[1] - value[0];
								const maxAllowedOffset = max - currentWidth;

								if (o > maxAllowedOffset) {
									const realOffset = clamp(o, 1, maxAllowedOffset);
									onChange([realOffset, currentWidth + realOffset]);
								} else {
									onChange([o, currentWidth + o]);
								}

								return;
							}

							onChange([o, w]);
						}}

						pushable={1}
						draggableTrack
						noCross={noOffsetHandle}

						handleRender={renderColumnConfigSliderHandle({ value: value, hasFocus: hasFocus, noOffsetHandle: noOffsetHandle, noWidthHandle: noWidthHandle })}

						onFocus={({ target }) => {
							target.style.setProperty('--es-custom-slider-handle-shadow', '0 0 0 1px white, 0 0 0 4px rgb(255 255 255 / 0.8), 0 0 0 4px var(--wp-admin-theme-color, var(--es-admin-accent-color-default))');
							setHasFocus(true);
						}}

						onBlur={({ target }) => {
							target.style.removeProperty('--es-custom-slider-handle-shadow');
							setHasFocus(false);
						}}

						{...columnConfigStyleProps(props, sliderHeight, max)}
					/>
				</div>

				{additionalControlsBelow &&
					<div className='es-h-end es-w-full'>
						{additionalControlsBelow}
					</div>
				}
			</div>
		</Control>
	);
};
