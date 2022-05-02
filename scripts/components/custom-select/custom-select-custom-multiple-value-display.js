import { components } from 'react-select';

/**
 * Custom multiple value display for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueLabel` from `react-select`)
 *
 * @param {object} props - components.MultiValueLabel props.
*/
export const CustomSelectCustomMultipleValueDisplay = (props) => (
	<components.MultiValueLabel {...props} />
);
