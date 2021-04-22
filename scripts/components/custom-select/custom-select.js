import React from 'react'; // eslint-disable-line no-unused-vars
import Select, { components } from 'react-select';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import AsyncSelect from "react-select/async";

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
	} = props;

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
		return <components.MultiValue {...propsSortable} innerProps={innerProps} />;
	}, []);

	const SortableMultiValueLabel = sortableHandle((props) => (
		<components.MultiValueLabel {...props} />
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
	}

	const onChangeInternal = (selectedOptions) => {
		if (!isSynchronous) {
			setSelected(selectedOptions);
			onChange(selectedOptions);
			return;
		}

		let output;

		// Compare curent selected posts with the API and sync them. 
		// This will remove posts that are trashed, deleted or drafted.
		// This will change the title if the post title has changed.
		if (multiple) {
			output = selectedOptions.filter((item) => options.some((element) => element.value === item.value));
		} else {
			output = selectedOptions;
		}

		setSelected(output);
		onChange(output);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const newValue = arrayMove(selected, oldIndex, newIndex);
		setSelected(newValue);
		onChange(newValue);
	};

	return (
		<BaseControl
			label={label}
			help={help}
		>
			<SortableSelect
				useDragHandle
				axis={sortAxis}
				onSortEnd={onSortEnd}
				distance={4}
				getHelperDimensions={({ node }) => node.getBoundingClientRect()}
				value={selected}
				loadOptions={customLoadOptions}
				cacheOptions={cacheOptions}
				placeholder={placeholder}
				defaultOptions={defaultOptions}
				onChange={onChangeInternal}
				options={options}
				isMulti={multiple}
				isSearchable={isSearchable}
				isClearable={isClearable}
				components={{
					MultiValue: SortableMultiValue,
					MultiValueLabel: SortableMultiValueLabel
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
		</BaseControl>
	);
};
