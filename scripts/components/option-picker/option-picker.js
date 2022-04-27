import React from 'react';
import { DropdownMenu, ToolbarGroup } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * A flexible picker of mutually exclusive options.
 * 
 * @param {object} props                                - OptionPicker options.
 * @param {object} props.value                          - Current value
 * @param {function} props.onChange                     - Function called when the selection is changed.
 * @param {array} props.options                         - Options to choose. Option should be in `{title: '', value: '', icon: ''}` format - `title` and  `value` are strings, `icon` is a JSX SVG component.
 * @param {string?} props.label                         - Label describing the component (doesn't apply if in *inline* mode).
 * @param {string} [props.screenReaderDescription]      - How the component is described by a screen reader, default format is *Change <label text>*.
 * @param {boolean} [props.isInToolbar=false]           - If `true`, the component is rendered as a `ToolbarGroup`, otherwise it renders as a `DropdownMenu`.
 * @param {boolean} [props.isInline=false]              - To be used with `isInToolbar`. If `true`, all options are shown inline, otherwise a button is shown that opens a dropdown option picker.
 * @param {boolean} [props.isToolbarButton=true]        - Not compatible with `isInline`. If `true`, the button that opens a dropdown option picker is rendered as a `ToolbarButton`, rather than a `Button`.
 * @param {string} [props.popoverPosition=bottom right] - Determines where the dropdown option picker is displayed relative to the button that opens it.
 * @param {boolean} [props.isToggleButtonActive=false]  - If `true`, the button that opens a dropdown option picker is highlighted.
 * @param {React.Component?} [props.buttonIcon]         - If set, the button that opens a dropdown option picker displays the set (JSX SVG) icon. Otherwise, the icon of the currently selected option (or first option if nothing selected) is used.
 * @param {boolean} [props.showToggleButtonLabel=false] - If `true`, the text label is shown next to the icon of the button that opens a dropdown option picker.
 * @param {boolean} [props.unsetOnClick=false] 			- If `true`, and you click a option that is currently selected, the value will be unset (set to `undefined`).
 * @param {boolean} [props.disabled=false]              - If `true`, control is disabled.
 */
export const OptionPicker
	= ({
		value: currentValue,
		onChange,
		options,
		label: controlLabel,
		screenReaderDescription : describedBy = sprintf(__('Change %s'), controlLabel),
		isInline: isCollapsed = false,
		isInToolbar: isToolbar = false,
		isToolbarButton = true,
		popoverPosition = 'bottom right',
		isToggleButtonActive = false,
		buttonIcon,
		showToggleButtonLabel = false,
		unsetOnClick = false,
		disabled = false,
	}) => {
		/**
		 * Gets the onChange callback with will (un)set a value
		 * when a new option gets picked.
		 * @param {*} value 
		 * @returns onChange callback
		 */
		function applyOrUnset(value) {
			if (unsetOnClick && currentValue === value) {
				return () => onChange(undefined);
			}

			return () => onChange(value);
		}

		/**
		 * Gets the buttonIcon if set, otherwise gets active option's
		 * icon or the first option's icon if nothing is selected.
		 * @returns JSX icon.
		 */
		function getIcon() {
			if (buttonIcon) {
				return buttonIcon;
			}
			
			const activeOption = options.find((control) => control.value === currentValue);

			if (activeOption) {
				return icons[activeOption.icon] ?? activeOption.icon;
			}

			return icons[options[0].icon] ?? options[0].icon;
		}

		// Get the right container component and options
		const UIComponent = isToolbar ? ToolbarGroup : DropdownMenu;
		const extraProps = isToolbar ? { isCollapsed: !isCollapsed } : { isToolbarButton };

		return (
			<UIComponent
				icon={getIcon()}
				label={controlLabel}
				text={showToggleButtonLabel ? controlLabel : null}
				toggleProps={{ 
					describedBy: describedBy,
					label: controlLabel,
					showTooltip: true,
					isPressed: isToggleButtonActive,
					disabled: disabled,
				}}
				popoverProps={{
					position: popoverPosition,
					isAlternate: true,
				}}
				controls={
					options.map((control) => {
						const { value, icon } = control;
						const isActive = currentValue === value;

						return {
							...control,
							icon: icons[icon] ?? icon,
							isActive,
							role: isCollapsed ? 'menuitemradio' : undefined,
							onClick: applyOrUnset(value),
						};
					})
				}
				iconSize={24}
				className='es-toolbar-icon-24'
				{...extraProps}
			/>
		);
	};
