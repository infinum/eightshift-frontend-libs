import { components } from 'react-select';

/**
 * Custom multiple value display container for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueContainer` from `react-select`)
 *
 * @param {object} props - components.MultiValueContainer props.
*/
export const CustomSelectCustomMultipleValueDisplayContainer = (props) => (
	<components.MultiValueContainer {...props} />
);
