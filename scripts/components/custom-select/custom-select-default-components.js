import classNames from 'classnames';
import React from 'react';
import { components } from 'react-select';
import { icons } from '@eightshift/frontend-libs/scripts';

/**
 * Default dropdown indicator for CustomSelect.
 *
 * @param {object} props - components.DropdownIndicator props.
*/
export const CustomSelectDefaultDropdownIndicator = (props) => (
	<components.DropdownIndicator {...props}>
		{React.cloneElement(icons.dropdownCaretAlt, {
			className: classNames(['es-has-animated-y-flip-icon -es-mr-1', props.selectProps.menuIsOpen ? 'is-active' : '']),
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
