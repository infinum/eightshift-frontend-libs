import React from 'react';
import Select, { components } from 'react-select';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import AsyncSelect from "react-select/async";

/**
 * A modern, flexible and customizable select menu.
 *
 * @param {object} props                                               - CustomSelect options.
 * @param {string?} [props.label]                                      - Label displayed above the control.
 * @param {string?} [props.help]                                       - Help text displayed below the control.
 * @param {boolean} [props.multiple=false]                             - If `true`, allows multiple items to be selected.
 * @param {array?} props.options                                       - Options to choose. Option should be in `{label: '', value: ''}` format.
 * @param {object} props.value                                         - Current value
 * @param {function} props.onChange                                    - Function called when the selection is changed.
 * @param {boolean} [props.isClearable=true]                           - If `true`, the currently selected item can be cleared. `null` is set as the value.
 * @param {boolean} [props.isSearchable=true]                          - If `true`, the options can be searched through.
 * @param {boolean} [props.closeMenuOnSelect=false]                    - If single-select mode is active, after a selection is made the dropdown is closed.
 * @param {boolean} [props.cacheOptions=true]                          - If in async mode (`loadOptions` is set) and set to `true`, the options are cached internally.
 * @param {boolean} [props.reFetchOnSearch=false]                      - If in async mode (`loadOptions` is set) and set to `true`, after a character is typed the `loadOptions` callback runs again with the provided search text as an argument.
 * @param {function?} props.loadOptions                                - An async callback that fetches an array of `{label: '', value: ''}`-formatted items.
 * @param {string?} [props.placeholder]                                - Placeholder text when no item is selected.
 * @param {string} [props.sortAxis=y]                                  - If multiple-select mode is active, determines the axis the items can be sorted on. Can be `x`, `y` or `xy`.
 * @param {React.Component?} [props.customOptionComponent]             - If provided, this control replaces the default option displayed in the dropdown.
 * @param {React.Component?} [props.customSingleValueDisplayComponent] - If provided and in single-select mode, this control replaces the default current value display when the dropdown is closed.
 * @param {React.Component?} [props.customIndicatorSeparator]          - If provided, adds a separator between the select content and the dropdown arrow on the right.
 * @param {boolean} [props.simpleValue=false]                          - If in synchronous (`options` is set), single-item (`multiple = false`) mode and this option set to `true`, you only need to provide the value to the component instead of an object. The return type also changes to value-only.
 */
export const CustomSelect = (props) => {
	const {
		label,
		help,
		multiple = false,
		options,
		value,
		onChange,
		isClearable = true,
		isSearchable = true,
		closeMenuOnSelect = false,
		cacheOptions = true,
		reFetchOnSearch = false,
		loadOptions,
		placeholder,
		sortAxis = 'y',
		customOptionComponent,
		customSingleValueDisplayComponent,
		customIndicatorSeparator,
		simpleValue = false,
	} = props;

	const { Option, SingleValue, MultiValue, MultiValueLabel } = components;

	const isSynchronous = !loadOptions;

	function arrayMove(array, from, to) {
		// eslint-disable-next-line no-param-reassign
		array = array.slice();
		array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
		return array;
	}

	const SortableMultiValue = SortableElement((propsSortable) => {

		// this prevents the menu from being opened/closed when the user clicks
		// on a value to begin dragging it. ideally, detecting a click (instead of
		// a drag) would still focus the control and toggle the menu, but that
		// requires some magic with refs that are out of scope for this example
		const onMouseDown = (e) => {
			e.preventDefault();
			e.stopPropagation();
		};
		const innerProps = { onMouseDown };
		return <MultiValue {...propsSortable} innerProps={innerProps} />;
	}, []);

	const SortableMultiValueLabel = sortableHandle((props) => (
		<MultiValueLabel {...props} />
	));

	const SortableSelect = SortableContainer(isSynchronous ? Select : AsyncSelect);

	const [selected, setSelected] = useState(value);
	const [defaultOptions, setDefaultOptions] = useState(true);

	const filterOptions = (inputValue, label) => label.toLowerCase().includes(inputValue.toLowerCase());

	const customLoadOptions = async (inputValue) => {
		if (!Array.isArray(defaultOptions)) {
			const options = await loadOptions(inputValue);
			setDefaultOptions(options);
		}

		if (reFetchOnSearch && inputValue.length) {
			const options = await loadOptions(inputValue);
			return new Promise((resolve) => resolve(options));
		}

		return new Promise((resolve) => {
			if (!inputValue.length) {
				resolve(defaultOptions);
			} else {
				resolve([...defaultOptions].filter(({ label }) => filterOptions(inputValue, label)));
			}
		});
	};

	const onChangeInternal = (selectedOptions) => {
		if (!isSynchronous) {
			setSelected(selectedOptions);
			onChange(selectedOptions);
			return;
		}

		let output;

		// Compare current selected posts with the API and sync them.
		// This will remove posts that are trashed, deleted or drafted.
		// This will change the title if the post title has changed.
		if (multiple) {
			output = selectedOptions.filter((item) => options.some((element) => element.value === item.value));
		} else {
			output = simpleValue ? selectedOptions?.value : selectedOptions;
		}

		setSelected(output);
		onChange(output);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		onChange(newValue);
	};

	const customSelectClass = 'components-custom-select';

	const selectControl = (
		<SortableSelect
			useDragHandle
			axis={sortAxis}
			onSortEnd={onSortEnd}
			distance={4}
			getHelperDimensions={({ node }) => node.getBoundingClientRect()}
			value={(!multiple && simpleValue) ? options.filter(({ value }) => value === selected) : selected}
			loadOptions={customLoadOptions}
			cacheOptions={cacheOptions}
			className={customSelectClass}
			placeholder={placeholder}
			defaultOptions={defaultOptions}
			onChange={onChangeInternal}
			options={options}
			isMulti={multiple}
			isSearchable={isSearchable}
			isClearable={isClearable}
			components={{
				MultiValue: SortableMultiValue,
				MultiValueLabel: SortableMultiValueLabel,
				Option: customOptionComponent ?? Option,
				SingleValue: customSingleValueDisplayComponent ?? SingleValue,
				IndicatorSeparator: customIndicatorSeparator ?? null,
			}}
			closeMenuOnSelect={closeMenuOnSelect}
			theme={(theme) => ({
				...theme,
				borderRadius: 3,
				colors: {
					...theme.colors,
					primary25: 'hsla(0, 0%, 90%, 1)',
					primary50: 'hsla(0, 0%, 80%, 1)',
					primary75: 'hsla(0, 0%, 70%, 1)',
					primary: 'hsla(0, 0%, 0%, 1)'
				},
			})}
		/>
	);

	if (!label) {
		return selectControl;
	}

	return (
		<BaseControl label={label} help={help}>
			{selectControl}
		</BaseControl>
	);
};
