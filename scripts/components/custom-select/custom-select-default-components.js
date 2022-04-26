import classNames from 'classnames';
import React from 'react';
import { components } from 'react-select';
import { icons } from '../../editor/icons/icons';

/**
 * Default dropdown indicator for CustomSelect.
 * 
 * @param {object} props - components.DropdownIndicator props.
*/
export const CustomSelectDefaultDropdownIndicator = (props) => (
	<components.DropdownIndicator {...props}>
		{React.cloneElement(icons.dropdownCaret, {
			className: classNames(['es-custom-select-dropdown-icon', props.selectProps.menuIsOpen ? 'is-open' : '']),
		})}
	</components.DropdownIndicator>
);

/**
 * Default clear indicator for CustomSelect.
 * 
 * @param {object} props - components.DropdownIndicator props.
*/
export const CustomSelectDefaultClearIndicator = (props) => (
	<components.ClearIndicator {...props}>
		{icons.clear}
	</components.ClearIndicator>
);
