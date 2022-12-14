import React from 'react';
import { __ } from '@wordpress/i18n';
import Select, { components } from 'react-select';
import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator } from './custom-select-default-components';
import { getDragEndHandler, getMultiValue, getMultiValueContainer, getMultiValueRemove } from './reorderable-select-components';

/**
 * Multi-select, re-orderable select menu.
 *
 * @param {object} props                                     - MultiSelect options.
 * @param {string?} [props.label]                            - Label displayed above the control.
 * @param {string?} [props.help]                             - Help text displayed below the control.
 * @param {array<{string, string}>?} props.options           - Options to choose from. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                               - Current value
 * @param {function} props.onChange                          - Function called when the selection is changed.
 * @param {boolean} [props.noClear=false]                    - If `true`, the items cannot be cleared/deleted all at once.
 * @param {boolean} [props.noSearch=false]                   - If `true`, the search functionality is disabled.
 * @param {boolean} [props.disabled=false]                   - If set `true`, the component is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false]    - If set `true`, the dropdown is not closed immediately after selecting an option.
 * @param {string} [props.noOptionsMessage='No options']     - Text to display when no options are available.
 * @param {React.Component?} [props.customDropdownIndicator] - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]    - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]        - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]      - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {React.Component?} [props.customValueContainer]    - If provided, replaces the default items container component (react-select's `components.MultiValueContainer`).
 * @param {React.Component?} [props.customValueRemove]       - If provided, replaces the default item remove button (react-select's `components.MultiValueRemove`.
 * @param {boolean} [props.noBottomSpacing=false]            - If `true`, the default bottom spacing is removed.
 * @param {string?} [props.additionalClasses='']             - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']       - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]               - If provided, the provided props will be passed to the Select control.
 */
export const MultiSelect = (props) => {
	const {
		label,
		help,

		options,
		value,

		onChange,

		noClear = false,
		noSearch = false,

		disabled = false,

		keepMenuOpenAfterSelect = false,

		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),

		customClearIndicator,
		customDropdownArrow,

		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

		noBottomSpacing = false,

		additionalClasses,
		additionalSelectClasses,
		additionalProps,
	} = props;

	return (
		<div className={`${noBottomSpacing ? '' : 'es-mb-5'} ${additionalClasses ?? ''}`}>
			{label &&
				<span className='es-mb-3'>{label}</span>
			}

			<DndContext modifiers={[restrictToParentElement]} onDragEnd={getDragEndHandler(onChange, value)}>
				<SortableContext items={value.map(({ id }) => id)}>
					<Select
						isMulti
						options={options.map((item) => ({ id: item.value, ...item }))}
						value={value}
						onChange={onChange}
						closeMenuOnSelect={!keepMenuOpenAfterSelect}
						isClearable={!noClear}
						isSearchable={!noSearch}
						isDisabled={disabled}
						className={additionalSelectClasses}
						noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
						theme={defaultEightshiftColorScheme}
						styles={defaultEightshiftStyles}
						components={{
							MultiValue: getMultiValue(customValueDisplay ?? components.MultiValue),
							MultiValueContainer: getMultiValueContainer(customValueContainer ?? components.MultiValueContainer),
							MultiValueRemove: getMultiValueRemove(customValueRemove ?? components.MultiValueRemove),

							Option: customMenuOption ?? components.Option,

							IndicatorSeparator: null,
							DropdownIndicator: customDropdownArrow ?? CustomSelectDefaultDropdownIndicator,
							ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
						}}
						{...additionalProps}
					/>
				</SortableContext>
			</DndContext>

			{help &&
				<span className='es-mt-3'>{help}</span>
			}
		</div>
	);
};
