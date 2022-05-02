import { components } from 'react-select';

/**
 * Custom dropdown indicator for CustomSelect.
 * 
 * (a wrapper for `components.DropdownIndicator` from `react-select`)
 *
 * @param {object} props - components.DropdownIndicator props.
*/
export const CustomSelectCustomDropdownIndicator = (props) => (
	<components.DropdownIndicator {...props} />
);
