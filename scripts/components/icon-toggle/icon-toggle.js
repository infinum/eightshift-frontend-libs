import React from 'react';
import { ToggleControl, CheckboxControl, Button } from '@wordpress/components';
import { IconLabel, classnames, TileButton } from '../../../scripts';

/**
 * Custom toggle control that can render as
 *
 * @param {object} props                                                                 - IconToggle options.
 * @param {React.Component} props.icon                                                   - Icon to display.
 * @param {string} props.label                                                           - Usually component name.
 * @param {'toggle'|'checkbox'|'button'|'iconButton'|'tileButton'} [props.type='toggle'] - Kind of toggle to render.
 * @param {string?} props.help                                                           - Help text to display.
 * @param {boolean} [props.inlineHelp=false]                                             - If `true` and `help` is provided, the help content is rended below the label, instead of below the component.
 * @param {boolean} props.checked                                                        - Is the component currently in use.
 * @param {function} props.onChange                                                      - `onChange` handler from the `ToggleSwitch`/`CheckboxControl`.
 * @param {boolean} [props.disabled=false]                                               - If `true`, control is disabled.
 * @param {boolean} [props.noBottomSpacing=false]                                        - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]                                        - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses]                                            - If provided, classes are passed to the underlying component.
 */
export const IconToggle = ({
	icon,
	label,

	type = 'toggle',

	help,
	inlineHelp = false,

	checked,
	onChange,

	disabled = false,

	noBottomSpacing = false,
	reducedBottomSpacing = false,

	additionalClasses,
}) => {
	if (type === 'tileButton') {
		return (
			<TileButton
				icon={icon}
				onClick={() => onChange(!checked)}
				isPressed={checked}
				label={label}
				disabled={disabled}
				additionalClasses={additionalClasses}
			/>
		);
	}

	if (type === 'button' || type === 'iconButton') {
		return (
			<Button
				icon={icon}
				onClick={() => onChange(!checked)}
				isPressed={checked}
				label={type === 'iconButton' && label}
				disabled={disabled}
				showTooltip={type === 'iconButton'}
				className={classnames(
					'es-button-icon-24 es-flex-grow-0 es-flex-shrink-0 es-rounded-1! es-is-v2-gutenberg-button',
					type === 'iconButton' && 'es-button-square-36',
					additionalClasses,
				)}
			>
				{type === 'button' && label}
			</Button>
		);
	}

	const ComponentToRender = (type === 'checkbox') ? CheckboxControl : ToggleControl;

	const bottomSpacingClass = reducedBottomSpacing ? 'es-mb-2!' : 'es-mb-5!';

	return (
		<ComponentToRender
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			help={!inlineHelp && help && <span className='es-text-3 es-color-cool-gray-450 -es-mt-1.5! es-display-block'>{help}</span>}
			label={icon ? (<IconLabel icon={icon} label={label} subtitle={inlineHelp && help} standalone />) : label}
			className={classnames(noBottomSpacing ? 'es-mb-0!' : bottomSpacingClass, additionalClasses)}
		/>
	);
};
