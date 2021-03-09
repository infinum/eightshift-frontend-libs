import React from 'react'; // eslint-disable-line no-unused-vars
import Select, { components } from 'react-select';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export const CustomSelect = (props) => {
	const {
		label,
		help,
		multiple = false,
		options = [],
		value,
		onChange,
		isClearable = true,
		isSearchable = true,
		closeMenuOnSelect = false,
	} = props;

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

	const SortableSelect = SortableContainer(Select);

	const [selected, setSelected] = useState(value);

	const onChangeInternal = (selectedOptions) => {

		let output;

		// Compare curent selected posts with the API and sync them. 
		// This will remove posts that are trashed, deleted or drafted.
		// This will change the title if the post title has changed.
		if(multiple) {
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
				axis="y"
				onSortEnd={onSortEnd}
				distance={4}
				getHelperDimensions={({ node }) => node.getBoundingClientRect()}
				name="select-two"
				value={selected}
				onChange={onChangeInternal}
				options={options}
				isMulti={multiple}
				isSearchable={isSearchable}
				isClearable={isClearable}
				components={{
					MultiValue: SortableMultiValue,
				}}
				closeMenuOnSelect={closeMenuOnSelect}
			/>
		</BaseControl>
	);
};
