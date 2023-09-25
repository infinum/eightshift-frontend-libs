import React from 'react';
import Select, { components } from 'react-select';
import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import {
	CustomSelectDefaultClearIndicator,
	CustomSelectDefaultDropdownIndicator,
	CustomSelectDefaultMultiValueRemove,
} from './custom-select-default-components';
import { getDragEndHandler, getMultiValue, getMultiValueContainer, getMultiValueRemove } from './multi-select-components';
import { customOnChange, getValue } from './shared';
import { Control } from '../base-control/base-control';

/**
 * Multi-select, re-orderable select menu.
 *
 * @param {object} props                                     - MultiSelect options.
 * @param {string?} [props.label]                            - Label displayed above the control.
 * @param {string?} [props.help]                             - Help text displayed below the control.
 * @param {React.Component?} [props.icon]                    - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                - Subtitle below the label.
 * @param {React.Component?} [props.actions]                 - Actions to show to the right of the label.
 * @param {boolean?} [props.inlineLabel]                     - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {array<{string, string}>?} props.options           - Options to choose from. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                               - Current value
 * @param {function} props.onChange                          - Function called when the selection is changed.
 * @param {boolean} [props.simpleValue=false]                - If `true`, instead of passing (and getting) a `{label: '', value: ''}` object from the component, only the value is returned.
 * @param {boolean} [props.clearable=false]                  - If `true`, a button to remove all items is shown.
 * @param {boolean} [props.noSearch=false]                   - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false]                   - If set `true`, the component is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false]    - If set `true`, the dropdown is not closed immediately after selecting an option.
 * @param {string?} [props.placeholder]                      - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]    - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]        - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]      - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {React.Component?} [props.customValueContainer]    - If provided, replaces the default items container component (react-select's `components.MultiValueContainer`).
 * @param {React.Component?} [props.customValueRemove]       - If provided, replaces the default item remove button (react-select's `components.MultiValueRemove`.
 * @param {boolean} [props.noBottomSpacing]                  - If `true`, the default bottom spacing is removed.
 * @param {boolean?} [props.reducedBottomSpacing]            - If `true`, space below the control is reduced.
 * @param {string?} [props.additionalClasses='']             - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']       - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]               - If provided, the provided props will be passed to the Select control.
 */
export const MultiSelect = (props) => {
	const {
		label,
		help,
		icon,
		subtitle,
		actions,
		inlineLabel,

		options,
		value,

		simpleValue = false,

		onChange,

		clearable = false,
		noSearch = false,

		disabled = false,

		keepMenuOpenAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,

		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

		noBottomSpacing,
		reducedBottomSpacing,

		additionalClasses,
		additionalSelectClasses,
		additionalProps,
	} = props;

	return (
		<Control
			label={label}
			icon={icon}
			subtitle={subtitle}
			actions={actions}
			additionalClasses={additionalClasses}
			noBottomSpacing={noBottomSpacing}
			reducedBottomSpacing={reducedBottomSpacing}
			help={help}
			inlineLabel={inlineLabel}
		>
			<DndContext modifiers={[restrictToParentElement]} onDragEnd={getDragEndHandler(onChange, value)}>
				<SortableContext items={value.map(({ id }) => id)}>
					<Select
						isMulti
						options={options.map((item) => ({ id: item.value, ...item }))}
						value={getValue(simpleValue, value, options)}
						onChange={(v) => customOnChange(simpleValue, v, onChange)}
						closeMenuOnSelect={!keepMenuOpenAfterSelect}
						isClearable={clearable}
						isSearchable={!noSearch}
						isDisabled={disabled}
						className={additionalSelectClasses}
						placeholder={placeholder}
						theme={defaultEightshiftColorScheme}
						styles={defaultEightshiftStyles}
						components={{
							MultiValue: getMultiValue(customValueDisplay ?? components.MultiValue),
							MultiValueContainer: getMultiValueContainer(customValueContainer ?? components.MultiValueContainer),
							MultiValueRemove: getMultiValueRemove(customValueRemove ?? CustomSelectDefaultMultiValueRemove),

							Option: customMenuOption ?? components.Option,

							IndicatorSeparator: null,
							DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
							ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
						}}
						menuPortalTarget={document.body}
						menuPosition='fixed'
						{...additionalProps}
					/>
				</SortableContext>
			</DndContext>
		</Control>
	);
};
