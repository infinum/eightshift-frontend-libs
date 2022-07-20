import { components } from 'react-select';

/**
 * Custom value display for CustomSelect.
 * 
 * (a wrapper for `components.SingleValue` from `react-select`)
 *
 * @param {object} props - components.SingleValue props.
*/
export const CustomSelectCustomValueDisplay = (props) => (
	<components.SingleValue {...props} />
);
