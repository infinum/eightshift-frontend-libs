import { SortableElement } from 'react-sortable-hoc';
import { components } from 'react-select';

export const arrayMove = (array, from, to) => {
	// eslint-disable-next-line no-param-reassign
	array = array.slice();
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
	return array;
};

export const filterOptions = (inputValue, label) => label.toLowerCase().includes(inputValue.toLowerCase());

export const SortableMultiValue = SortableElement((propsSortable) => {
	// This prevents the menu from being opened/closed when the user clicks
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
