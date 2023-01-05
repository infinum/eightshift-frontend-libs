import React from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { defaultEightshiftColorScheme, defaultEightshiftStyles } from './custom-select-style';
import { CustomSelectDefaultClearIndicator, CustomSelectDefaultDropdownIndicator, CustomSelectDefaultMultiValueRemove } from './custom-select-default-components';
import { getDragEndHandler, getMultiValue, getMultiValueContainer, getMultiValueRemove } from './multi-select-components';

/**
 * Multi-select, asynchronously-loading, re-orderable select menu.
 *
 * @param {object} props                                               - AsyncMultiSelect options.
 * @param {string?} [props.label]                                      - Label displayed above the control.
 * @param {string?} [props.help]                                       - Help text displayed below the control.
 * @param {boolean|array<{string,string}>} [props.preloadOptions=true] - If `true`, the initial loading is done as soon as the component is loaded. If an array of `{label: '', value: ''}` option is provided, that is loaded immediately, dynamic fetching only happens in search. If `false`, nothing is loaded immediately, until you type to search.
 * @param {callback<Promise<>>?} props.loadOptions                     - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {object} props.value                                         - Current value
 * @param {function} props.onChange                                    - Function called when the selection is changed.
 * @param {boolean} [props.clearable=false]                            - If `true`, a button to remove all items is shown.
 * @param {boolean} [props.noSearch=false]                             - If `true`, the search functionality is disabled.
 * @param {boolean} [props.noOptionCaching=false]                      - If `true`, react-select option caching functionality is disabled.
 * @param {boolean} [props.disabled=false]                             - If set `true`, the component is disabled.
 * @param {boolean} [props.keepMenuOpenAfterSelect=false]              - If set `true`, the dropdown is not closed immediately after selecting an option.
 * @param {string?} [props.placeholder]                                - Placeholder text when nothing is selected.
 * @param {React.Component?} [props.customDropdownIndicator]           - If provided, replaces the default dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]              - If provided and `noClear` is `false`, replaces the default 'Clear all' button.
 * @param {React.Component?} [props.customMenuOption]                  - If provided, replaces the default item in the dropdown menu (react-select's `components.Option`).
 * @param {React.Component?} [props.customValueDisplay]                - If provided, replaces the default current value display of each selected item (react-select's `components.MultiValue`).
 * @param {React.Component?} [props.customValueContainer]              - If provided, replaces the default items container component (react-select's `components.MultiValueContainer`).
 * @param {React.Component?} [props.customValueRemove]                 - If provided, replaces the default item remove button (react-select's `components.MultiValueRemove`.
 * @param {boolean} [props.noBottomSpacing=false]                      - If `true`, the default bottom spacing is removed.
 * @param {function} [props.processLoadedOptions]                      - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label`, `value` keys and `id` keys, additional fields can be added as required.
 * @param {string?} [props.additionalClasses='']                       - If provided, the classes are added to the component container.
 * @param {string?} [props.additionalSelectClasses='']                 - If provided, the classes are added to the Select element itself.
 * @param {object?} [props.additionalProps={}]                         - If provided, the provided props will be passed to the Select control.
 */
export const AsyncMultiSelect = (props) => {
	const {
		label,
		help,

		preloadOptions = true,
		loadOptions,
		value,

		onChange,

		clearable = false,
		noSearch = false,
		noOptionCaching = false,

		disabled = false,

		keepMenuOpenAfterSelect = false,

		placeholder,

		customClearIndicator,
		customDropdownArrow,

		customMenuOption,
		customValueDisplay,
		customValueRemove,
		customValueContainer,

		noBottomSpacing = false,

		processLoadedOptions = (options) => options,

		additionalClasses,
		additionalSelectClasses,
		additionalProps,
	} = props;

	const customLoadOptions = async (searchText) => {
		const results = await loadOptions(searchText);
		return processLoadedOptions(results?.map((item) => ({ id: item.value, ...item })) ?? []);
	};

	return (
		<div className={`${noBottomSpacing ? '' : 'es-mb-5'} ${additionalClasses ?? ''}`}>
			{label &&
				<div className='es-mb-2'>{label}</div>
			}

			<DndContext modifiers={[restrictToParentElement]} onDragEnd={getDragEndHandler(onChange, value)}>
				<SortableContext items={value.map(({ id }) => id)}>
					<AsyncSelect
						isMulti
						loadOptions={customLoadOptions}
						cacheOptions={!noOptionCaching}
						defaultOptions={preloadOptions}
						value={value}
						onChange={onChange}
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

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500'>{help}</div>
			}
		</div>
	);
};
