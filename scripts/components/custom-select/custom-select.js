import React, { useCallback, useMemo } from 'react';
import Select, { components } from 'react-select';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { SortableContainer, sortableHandle } from 'react-sortable-hoc';
import AsyncSelect from 'react-select/async';
import { filterOptions, SortableMultiValue, arrayMove } from './custom-select-helpers';
import { CustomSelectStyle } from './custom-select-style';
import { CustomSelectDefaultDropdownIndicator, CustomSelectDefaultClearIndicator } from './custom-select-default-components';

/**
 * A modern, flexible and customizable select menu.
 *
 * @param {object} props                                                       - CustomSelect options.
 * @param {string?} [props.label]                                              - Label displayed above the control.
 * @param {string?} [props.help]                                               - Help text displayed below the control.
 * @param {boolean} [props.multiple=false]                                     - If `true`, allows multiple items to be selected.
 * @param {array?} props.options                                               - Options to choose. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                                                 - Current value
 * @param {function} props.onChange                                            - Function called when the selection is changed.
 * @param {boolean} [props.isCompact=false]                                    - If `true`, the component will slightly reduce height so it fits nicely with WP Buttons and similar components.
 * @param {boolean} [props.isClearable=true]                                   - If `true`, the currently selected item can be cleared. `null` is set as the value.
 * @param {boolean} [props.isSearchable=true]                                  - If `true`, the options can be searched through.
 * @param {boolean} [props.closeMenuOnSelect=false]                            - If single-select mode is active, after a selection is made the dropdown is closed.
 * @param {boolean} [props.cacheOptions=true]                                  - If in async mode (`loadOptions` is set) and set to `true`, the options are cached internally.
 * @param {boolean} [props.reFetchOnSearch=false]                              - If in async mode (`loadOptions` is set) and set to `true`, after a character is typed the `loadOptions` callback runs again with the provided search text as an argument.
 * @param {function?} props.loadOptions                                        - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {string?} [props.placeholder]                                        - Placeholder text when no item is selected.
 * @param {string} [props.sortAxis=y]                                          - If multiple-select mode is active, determines the axis the items can be sorted on. Can be `x`, `y` or `xy`.
 * @param {React.Component?} [props.customOptionComponent]                     - If provided, this control replaces the default option displayed in the dropdown.
 * @param {React.Component?} [props.customSingleValueDisplayComponent]         - If provided and in single-select mode, this control replaces the default current value display when the dropdown is closed.
 * @param {React.Component?} [props.customMultiValueDisplayComponent]          - If provided and in multi-select mode, this control replaces the default current value display of each selected item.
 * @param {React.Component?} [props.customMultiValueDisplayContainerComponent] - If provided and in multi-select mode, this control replaces the default wrapper of the current value display of each selected items (contains item label and remove button).
 * @param {React.Component?} [props.customMultiValueRemoveButton]              - If provided and in multi-select mode, this control replaces the default item remove button.
 * @param {React.Component?} [props.customIndicatorSeparator]                  - If provided, adds a separator between the select content and the dropdown arrow on the right.
 * @param {React.Component?} [props.customDropdownIndicator]                   - If provided, replaces the dropdown arrow indicator.
 * @param {React.Component?} [props.customClearIndicator]                      - If provided and `isClearable` is `true`, replaces the clear button.
 * @param {boolean} [props.simpleValue=false]                                  - If in single-item (`multiple = false`) mode and this option set to `true`, you only need to provide the value to the component instead of an object. The return type also changes to value-only.
 * @param {boolean} [props.disabled=false]                                     - If set to `true`, renders the component as disabled.
 * @param {boolean} [props.loading=false]                                      - If set to `true`, renders the component in a loading state.
 * @param {boolean} [props.blurInputOnSelect=false]                            - If set to `true`, focus is removed from the input once an option is selected.
 * @param {boolean} [props.hideSelected=false]                                 - If set to `true`, the selected option is hidden from the menu.
 * @param {string} [props.loadingMessage='Loading']                            - Text to display when loading options.
 * @param {string} [props.noOptionsMessage='No options']                       - Text to display when no options are available.
 * @param {function} [props.filterAsyncOptions]                                - Allows modifying (filtering, grouping, ...) options output after the items have been dynamically fetched. Please make sure to include `label` and `value` keys, additional fields can be added as required.
 * @param {CustomSelectStyle} [props.style=CustomSelectStyle.DEFAULT]          - Style of the CustomSelect.
 * @param {string?} [props.additionalClasses='']                               - If passed, the classes will be added to the `<BaseControl>` element if `label` or `help` are passed, otherwise the classes are added to the component directly.
 */
export const CustomSelect = (props) => {
	const {
		// General.
		help,
		label,
		value,
		options,
		onChange,
		placeholder,
		disabled = false,
		multiple = false,
		simpleValue = false,

		// Visual.
		loading = false,
		isCompact = false,
		style = CustomSelectStyle.DEFAULT,

		// Async.
		loadOptions,
		cacheOptions = true,
		reFetchOnSearch = false,
		filterAsyncOptions = (opts) => opts,

		// Behavior.
		sortAxis = 'y',
		isClearable = true,
		isSearchable = true,
		hideSelected = false,
		additionalClasses = '',
		blurInputOnSelect = false,
		closeMenuOnSelect = false,

		// i18n.
		loadingMessage = __('Loading', 'eightshift-frontend-libs'),
		noOptionsMessage = __('No options', 'eightshift-frontend-libs'),

		// Custom components.
		customClearIndicator,
		customOptionComponent,
		customDropdownIndicator,
		customIndicatorSeparator,
		customMultiValueRemoveButton,
		customMultiValueDisplayComponent,
		customSingleValueDisplayComponent,
		customMultiValueDisplayContainerComponent,
	} = props;

	const { Option, SingleValue, MultiValueLabel, MultiValueContainer, MultiValueRemove } = components;

	const SortableMultiValueLabel = useMemo(() => sortableHandle((props) => {
		if (customMultiValueDisplayComponent) {
			const CustomMultiValue = customMultiValueDisplayComponent;
			return <CustomMultiValue {...props} />;
		}

		return <MultiValueLabel {...props} />;
	}), [customMultiValueDisplayComponent]);

	const [selected, setSelected] = useState(value);
	const [defaultOptions, setDefaultOptions] = useState(true);
	const isSynchronous = useMemo(() => !loadOptions, [loadOptions]);
	const SortableSelect = useMemo(() => SortableContainer(isSynchronous ? Select : AsyncSelect), [isSynchronous]);

	const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		onChange(newValue);
	}, [onChange, selected]);

	const customLoadOptions = useCallback(async (inputValue) => {
		// Reload the selected item.
		setSelected(selected);

		if (reFetchOnSearch && Array.isArray(defaultOptions)) {
			const opts = await loadOptions(inputValue);

			return new Promise((resolve) => resolve(filterAsyncOptions(opts)));
		}

		const opts = Array.isArray(defaultOptions) ? defaultOptions : await loadOptions(inputValue);

		setDefaultOptions(filterAsyncOptions(opts));

		return new Promise((resolve) => {
			if (inputValue?.length > 0) {
				resolve(filterAsyncOptions([...opts].filter(({ label }) => filterOptions(inputValue, label))));
			} else {
				resolve(filterAsyncOptions(opts));
			}
		});
	}, [defaultOptions, filterAsyncOptions, loadOptions, reFetchOnSearch, selected]);

	const onChangeInternal = useCallback((selectedOptions) => {
		if (selectedOptions === undefined || selectedOptions === null) {
			setSelected(undefined);
			onChange(undefined);
			return;
		}

		let output;

		if (multiple) {
			output = selectedOptions.reduce((arr, curr) => {
				const updatedItem = (options ?? defaultOptions)?.find((element) => element.value === curr.value);

				if (updatedItem) {
					return [...arr, updatedItem];
				}

				return [...arr, curr];
			}, []);
		} else {
			output = simpleValue ? selectedOptions?.value : selectedOptions;
		}

		if (simpleValue && selectedOptions && selectedOptions?.value) {
			const selectionCache = window.localStorage.getItem('es-custom-select-cache');

			if (selectionCache === null || selectionCache === false || selectionCache === undefined) {
				window.localStorage.setItem('es-custom-select-cache', JSON.stringify({ [selectedOptions.value]: selectedOptions }));
			} else {
				const parsedSelectionCache = JSON.parse(selectionCache ?? '{}');
				window.localStorage.setItem('es-custom-select-cache', JSON.stringify({ ...parsedSelectionCache, [selectedOptions.value]: selectedOptions }));
			}
		}

		setSelected(output);
		onChange(output);
	}, [defaultOptions, multiple, onChange, options, simpleValue]);

	const getValue = useCallback(() => {
		if (
			selected === undefined
			|| selected === null
			|| Object.prototype.hasOwnProperty.call(selected, 'value') && selected.value === undefined
			|| Object.prototype.hasOwnProperty.call(selected, 'value') && selected.value === null
			|| (Array.isArray(selected) && selected?.length < 1)
			|| ((typeof selected).toLowerCase() === 'object' && Object.keys(selected).length === 0)
			|| ((typeof selected).toLowerCase() === 'number' && Number.isNaN(selected))
		) {
			return undefined;
		}

		if (multiple || !simpleValue) {
			return selected;
		}

		if (options) {
			return options.filter(({ value }) => value === selected);
		}

		if (Array.isArray(defaultOptions) && defaultOptions?.length > 0) {
			const itemFromAsyncOptions = defaultOptions.filter(({ value }) => value === selected)[0];

			if (itemFromAsyncOptions) {
				return itemFromAsyncOptions;
			}
		}

		const selectionCache = JSON.parse(window?.localStorage?.getItem('es-custom-select-cache') ?? '{}');

		if (selectionCache && selectionCache[selected]) {
			return selectionCache[selected];
		}

		if (Number.isNaN(selected)) {
			return {
				label: 'Item',
				value: selected,
			};
		}

		return {
			label: `Item ${selected}`,
			value: selected,
		};
	}, [selected, multiple, simpleValue, options, defaultOptions]);

	return (
		<BaseControl label={label} help={help} className={(label || help) ? additionalClasses : ''} >
			<SortableSelect
				useDragHandle
				axis={sortAxis}
				onSortEnd={onSortEnd}
				distance={4}
				getHelperDimensions={({ node }) => node.getBoundingClientRect()}
				value={getValue()}
				loadOptions={customLoadOptions}
				cacheOptions={cacheOptions}
				className={`components-custom-select ${(!label && !help) && additionalClasses ? additionalClasses : ''}`}
				placeholder={placeholder}
				defaultOptions={defaultOptions}
				onChange={onChangeInternal}
				options={options}
				isMulti={multiple}
				isSearchable={isSearchable}
				isClearable={isClearable}
				isDisabled={disabled}
				isLoading={loading}
				blurInputOnSelect={blurInputOnSelect}
				hideSelectedOptions={hideSelected}
				loadingMessage={() => (<span>{loadingMessage}</span>)}
				noOptionsMessage={() => (<span>{noOptionsMessage}</span>)}
				components={{
					MultiValue: SortableMultiValue,
					MultiValueLabel: SortableMultiValueLabel,
					Option: customOptionComponent ?? Option,
					SingleValue: customSingleValueDisplayComponent ?? SingleValue,
					IndicatorSeparator: customIndicatorSeparator ?? null,
					MultiValueContainer: customMultiValueDisplayContainerComponent ?? MultiValueContainer,
					MultiValueRemove: customMultiValueRemoveButton ?? MultiValueRemove,
					DropdownIndicator: customDropdownIndicator ?? CustomSelectDefaultDropdownIndicator,
					ClearIndicator: customClearIndicator ?? CustomSelectDefaultClearIndicator,
				}}
				closeMenuOnSelect={closeMenuOnSelect}
				theme={(theme) => ({
					...theme,
					borderRadius: 2,
					colors: {
						...theme.colors,
						primary25: 'hsla(0, 0%, 90%, 1)',
						primary50: 'hsla(0, 0%, 80%, 1)',
						primary75: 'hsla(0, 0%, 70%, 1)',
						primary: 'hsla(0, 0%, 0%, 1)'
					},
				})}
				styles={{
					menu: (provided) => {
						let bgColor = provided?.backgroundColor ?? 'rgba(255 255 255 / 0.75)';

						if (bgColor.includes('hsl') && !bgColor.includes('hsla')) {
							bgColor = bgColor.replaceAll(',', '').replace(')', ' / 0.75)');
						}

						return {
							...provided,
							borderTopLeftRadius: '0',
							borderTopRightRadius: '0',
							zIndex: 5,
							marginTop: 1,
							backgroundColor: bgColor,
							backdropFilter: 'blur(1rem) saturate(150%)',
						};
					},
					control: (provided, state) => ({
						...provided,
						position: 'static',
						borderBottomLeftRadius: state.menuIsOpen ? 0 : state.theme.borderRadius,
						borderBottomRightRadius: state.menuIsOpen ? 0 : state.theme.borderRadius,
						zIndex: state.menuIsOpen ? 4 : null,
						borderColor: style,
						minHeight: isCompact ? '2.25rem' : provided.minHeight,
						height: isCompact ? '2.25rem' : provided.height,
					}),
					option: (provided, state) => ({
						...provided,
						margin: '0.125rem 0.375rem',
						width: 'calc(100% - 0.75rem)',
						borderRadius: '0.25rem',
						transition: 'all 0.3s ease-out',
						...(state.isSelected ? { backgroundColor: 'var(--wp-admin-theme-color, #111111)' } : {}),
					}),
					valueContainer: (provided) => {
						if (!isCompact) {
							return provided;
						}

						return {
							...provided,
							padding: '0 0.5rem',
							height: '2.125rem',
						};
					},
					indicatorsContainer: (provided) => {
						if (!isCompact) {
							return provided;
						}

						return {
							...provided,
							height: '2.125rem',
						};
					}
				}}
			/>
		</BaseControl>
	);
};
