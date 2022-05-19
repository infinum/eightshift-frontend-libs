import { icons } from '../../../scripts';
import { BaseControl, Button } from '@wordpress/components';
import classnames from 'classnames';

/**
 * Horizontal button option selector, inspired by WP 5.9.
 * 
 * @param {object} props                                                                       - SimpleHorizontalSingleSelect options.
 * @param {React.Component?} [props.help]                                                      - Help text displayed below the control.
 * @param {any} [props.value]                                                                  - Current value.
 * @param {React.Component?} [props.label]                                                     - Label displayed above the control.
 * @param {array<string|{label, value, icon, tooltip}>} [props.options]                        - Options to show, either values or objects with {label?, value, icon?}
 * @param {function} [props.onChange]                                                          - Function that is called on every value change.
 * @param {React.Component?} [props.inlineLabel]                                               - Label displayed inline with the control.
 * @param {array<{label, value}>?} [props.optionLabels]                                        - If passed, these labels/icons will be used instead the ones provided with `options`. Must be passed when `options` contain just values.
 * @param {boolean} [props.iconOnly=false]                                                     - If `true`, the buttons will only contain icons. If a label is also passed, it will be used for the button tooltip.
 * @param {boolean} [props.allowWrap=true]                                                     - If `true` and there is more options then can fit, the buttons will wrap to the row below.
 * @param {boolean} [props.disabled=false]                                                     - If `true`, the component will be disabled.
 * @param {'none'|'inset'|'offset'} [props.border='none']                                      - Sets the appearance of a border around the buttons.
 * @param {'default'|'stretch'|'left'|'center'|'right'|'vertical'} [props.alignment='default'] - If `true` and there is more options then can fit, the buttons will wrap to the row below.
 * @param {boolean} [props.includeWpBottomSpacing=false]                                       - If `true`, the component will add bottom spacing to match other Gutenberg components.
 * @param {boolean} [props.compactButtons=false]                                               - If `true`, the buttons are rendered smaller
 * @param {boolean} [props.largerIcons=false]                                                  - If `true`, the icons inside of buttons are rendered larger.
 * @param {string?} [props.additionalClass]                                                    - If provided, the classes are appended to the BaseControl / control wrapper.
 * @param {string?} [props.additionalButtonClass]                                              - If provided, the classes are appended to the selection buttons.
 */
export const SimpleHorizontalSingleSelect = (props) => {
	const {
		help,
		value,
		label,
		options,
		onChange,
		inlineLabel,
		optionLabels,
		iconOnly = false,
		allowWrap = true,
		disabled = false,
		border = 'none',
		alignment = 'default',
		includeWpBottomSpacing = true,
		compactButtons = false,
		largerIcons = false,
		additionalClass,
		additionalButtonClass,
	} = props;

	const buttonClasses = classnames([
		iconOnly ? 'es-button-square-36' : '',
		largerIcons ? 'es-button-icon-24' : '',
		additionalButtonClass ?? '',
	]);

	const spacingConfig = {
		default: {
			width: 'max-content',
		},
		left: {
			marginRight: 'auto',
			justifyContent: 'flex-start',
			width: 'max-content',
		},
		center: {
			marginLeft: 'auto',
			marginRight: 'auto',
			justifyContent: 'center',
			width: 'max-content',
		},
		right: {
			marginLeft: 'auto',
			justifyContent: 'flex-end',
			width: 'max-content',
		},
		stretch: {
			justifyContent: 'space-between',
			width: '100%',
		},
		vertical: {
			flexDirection: 'column',
			width: '100%',
		}
	};

	const borderConfig = {
		offset: {
			borderRadius: 3,
			padding: '0.125rem',
			border: '1px solid #ccc',
		}
	};

	const control = (
		<div
			className={classnames([
				'es-simple-h-single-select',
				border === 'inset' ? 'has-inset-border' : '',
			])}
			style={{
				display: 'flex',
				flexWrap: allowWrap ? 'wrap' : 'nowrap',
				maxWidth: '100%',
				...(spacingConfig[alignment] ?? {}),
				...(borderConfig[border] ?? {}),
			}}
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

	const wrappedControl = (
		<div
			className={classnames([
				'es-h-flex-between',
				'es-gap-s',
				includeWpBottomSpacing ? 'es-has-wp-field-b-space' : '',
				additionalClass ?? '',
			])}
		>
			{inlineLabel}
			{control}
		</div>
	);

	const controlToReturn = inlineLabel ? wrappedControl : control;

	if ((includeWpBottomSpacing || label || help) && !inlineLabel) {
		return (
			<BaseControl label={label} help={help} className={additionalClass ?? ''}>
				{controlToReturn}
			</BaseControl>
		);
	}

	return controlToReturn;
};
