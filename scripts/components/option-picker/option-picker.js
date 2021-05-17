import { DropdownMenu, ToolbarGroup } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { icons } from '@eightshift/frontend-libs/scripts/editor';

export const OptionPicker
	= ({
		value: currentValue,
		onChange,
		options,
		label: controlLabel,
		screenReaderDescription : describedBy = sprintf(__('Change %s'), controlLabel),
		isInline: isCollapsed = false,
		isInToolbar: isToolbar,
		isToolbarButton = true,
		popoverPosition = 'bottom right',
		isToggleButtonActive = false,
		buttonIcon,
		showToggleButtonLabel = false,
	}) => {
		/**
		 * Gets the onChange callback with will (un)set a value
		 * when a new option gets picked.
		 * @param {*} value 
		 * @returns onChange callback
		 */
		function applyOrUnset(value) {
			return () => onChange(currentValue === value ? undefined : value);
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
				{...extraProps}
			/>
		);
	}
