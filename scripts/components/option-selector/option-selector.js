import React from 'react';
import { icons, classnames} from '@eightshift/frontend-libs/scripts';
import { Button } from '@wordpress/components';

/**
 * Button-based option selector, inspired by WP 5.9.
 *
 * @param {object} props                                                                       - OptionSelector options.
 * @param {React.Component?} [props.help]                                                      - Help text displayed below the control.
 * @param {React.Component?} [props.label]                                                     - Label displayed above the control.
 * @param {React.Component?} [props.inlineLabel]                                               - Label displayed inline with the control.
 * @param {any} [props.value]                                                                  - Current value.
 * @param {function} [props.onChange]                                                          - Function that is called on every value change.
 * @param {boolean} [props.disabled=false]                                                     - If `true`, the component will be disabled.
 * @param {array<string|{label, value, icon, tooltip}>} [props.options]                        - Options to show, either values or objects with {label?, value, icon?}
 * @param {array<{label, value}>?} [props.optionLabels]                                        - If passed, these labels/icons will be used instead the ones provided with `options`. Must be passed when `options` contain just values.
 * @param {'none'|'offset'} [props.border='offset']                                            - Sets the appearance of a border around the buttons.
 * @param {boolean} [props.allowWrap=true]                                                     - If `true` and there is more options then can fit, the buttons will wrap to the row below.
 * @param {'default'|'stretch'|'left'|'center'|'right'|'vertical'} [props.alignment='default'] - If `true` and there is more options then can fit, the buttons will wrap to the row below.
 * @param {boolean} [props.iconOnly=false]                                                     - If `true`, the buttons will only contain icons. If a label is also passed, it will be used for the button tooltip.
 * @param {boolean} [props.largerIcons=false]                                                  - If `true`, the icons inside of buttons are rendered larger.
 * @param {boolean} [props.compactButtons=false]                                               - If `true`, the buttons are rendered smaller
 * @param {boolean} [props.noBottomSpacing=false]                                              - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClass]                                                    - If provided, the classes are appended to the button container.
 * @param {string?} [props.additionalButtonClass]                                              - If provided, the classes are appended to the selection buttons.
 * @param {string?} [props.additionalContainerClass]                                           - If provided, the classes are appended to the container.
 */
export const OptionSelector = (props) => {
	const {
		help,
		label,
		inlineLabel,

		value,
		onChange,

		disabled = false,

		options,
		optionLabels,

		border = 'offset',
		allowWrap = true,
		alignment = 'default',

		iconOnly = false,
		largerIcons = false,
		compactButtons = false,

		noBottomSpacing = false,

		additionalClass,
		additionalButtonClass,
		additionalContainerClass,
	} = props;

	const buttonClasses = classnames(
		iconOnly && 'es-button-square-36',
		largerIcons && 'es-button-icon-24',
		border === 'offset' && 'es-rounded-0.75!',
		additionalButtonClass
	);

	const getSpacingConfig = (alignment) => {
		switch (alignment) {
			case 'left':
				return 'es-mr-auto es-content-start es-w-max';
			case 'center':
				return 'es-mx-auto es-content-center es-w-max';
			case 'right':
				return 'es-ml-auto es-content-center es-w-max';
			case 'stretch':
				return 'es-content-between es-w-full';
			case 'vertical':
				return 'es-flex-col es-w-full';
			default:
				return 'es-w-max';
		}
	};

	const control = (
		<div
			className={classnames(
				'es-option-selector es-display-flex es-has-v2-gutenberg-button-active-state-inside es-max-w-full',
				!label && !help && additionalClass,
				allowWrap ? 'es-flex-wrap' : 'es-flex-nowrap',
				border === 'offset' && 'es-border-cool-gray-300 es-p-0.5 es-rounded-1.25',
				getSpacingConfig(alignment),
			)}
		>
			{options.map((item, i) => {
				const iconData = icons?.[item?.icon] ?? item?.icon ?? optionLabels?.[i]?.icon;

				let icon = iconData;

				if (iconData && typeof iconData === 'string' && (iconData?.startsWith('<svg') ?? false)) {
					icon = (
						<i className='es-line-h-0 es-display-contents' dangerouslySetInnerHTML={{ __html: iconData }}></i>
					);
				}

				const label = item?.label ?? optionLabels?.[i]?.label;
				const current = optionLabels ? item : item?.value;
				const tooltip = item?.tooltip ?? optionLabels?.[i]?.tooltip ?? item?.label ?? optionLabels?.[i]?.label;

				if (icon && !label) {
					return (
						<Button
							key={i}
							onClick={() => onChange(current)}
							isPressed={value === current}
							icon={icon}
							disabled={disabled}
							isSmall={compactButtons}
							className={buttonClasses}
						/>
					);
				} else if (icon && label && iconOnly) {
					return (
						<Button
							key={i}
							onClick={() => onChange(current)}
							isPressed={value === current}
							icon={icon}
							label={tooltip}
							disabled={disabled}
							showTooltip
							isSmall={compactButtons}
							className={buttonClasses}
						/>
					);
				} else if (icon && label) {
					return (
						<Button
							key={i}
							onClick={() => onChange(current)}
							isPressed={value === current}
							icon={icon}
							disabled={disabled}
							isSmall={compactButtons}
							label={tooltip !== label ? tooltip : null}
							showTooltip={tooltip !== label}
							className={buttonClasses}
						>
							{label}
						</Button>
					);
				}

				return (
					<Button
						key={i}
						onClick={() => onChange(current)}
						isPressed={value === current}
						disabled={disabled}
						isSmall={compactButtons}
						label={tooltip !== label ? tooltip : null}
						showTooltip={tooltip !== label}
						className={buttonClasses}
					>
						{label}
					</Button>
				);
			})}
		</div>
	);

	return (
		<div className={classnames('es-v-spaced', !noBottomSpacing && 'es-mb-5', additionalContainerClass)}>
			{inlineLabel &&
				<div className='es-h-between'>
					{inlineLabel}
					{control}
				</div>
			}

			{!inlineLabel && label}
			{!inlineLabel && control}

			{help &&
				<span className='es-text-3 es-color-cool-gray-500'>{help}</span>
			}
		</div>
	);
};
