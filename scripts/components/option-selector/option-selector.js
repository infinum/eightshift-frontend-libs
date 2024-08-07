import React from 'react';
import { OptionSelect } from '@eightshift/ui-components';

/**
 * @deprecated Use `OptionSelect` from `@eightshift/ui-components` instead.
 *
 * Button-based option selector, inspired by WP 5.9.
 *
 * @param {object} props - OptionSelector options.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.help] - Help text displayed below the control.
 * @param {React.Component?} [props.label] - Label displayed above the control.
 * @param {boolean?} [props.inlineLabel] - Label displayed inline with the control.
 * @param {React.Component?} [props.actions] - Actions to show to the right of the label.
 * @param {React.Component?} [props.subtitle] - Subtitle below the label.
 * @param {any} [props.value] - Current value.
 * @param {function} [props.onChange] - Function that is called on every value change.
 * @param {boolean} [props.disabled=false] - If `true`, the component will be disabled.
 * @param {array<string|{label, value, icon, tooltip}>} [props.options] - Options to show, either values or objects with {label?, value, icon?, subtitle?}
 * @param {'default'|'stretch'|'left'|'center'|'right'|'vertical'} [props.alignment='default'] - Option alignment.
 * @param {boolean} [props.iconOnly=false] - If `true`, the buttons will only contain icons. If a label is also passed, it will be used for the button tooltip.
 * @param {boolean} [props.compactButtons=false] - If `true`, the buttons are rendered smaller
 * @param {string?} [props.additionalClass] - If provided, the classes are appended to the button container.
 * @param {string?} [props.additionalButtonClass] - If provided, the classes are appended to the selection buttons.
 * @param {string?} [props.additionalContainerClass] - If provided, the classes are appended to the container.
 */
export const OptionSelector = (props) => {
	const {
		icon,
		help,
		label,
		inlineLabel,
		actions,
		subtitle,

		value,
		onChange,

		disabled = false,

		options,

		alignment = 'default',

		iconOnly = false,
		compactButtons = false,

		additionalButtonClass,
		additionalContainerClass,
	} = props;

	return (
		<OptionSelect
			icon={icon}
			help={help}
			label={label}
			inline={inlineLabel}
			actions={actions}
			subtitle={subtitle}
			value={value}
			onChange={onChange}
			disabled={disabled}
			options={options}
			vertical={alignment === 'vertical'}
			noItemLabel={iconOnly}
			itemProps={{ size: compactButtons ? 'small' : 'default' }}
			className={additionalContainerClass}
			itemClassName={additionalButtonClass}
		/>
	);
};
