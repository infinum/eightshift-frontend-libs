import { components } from 'react-select';

/**
 * Custom option for CustomSelect.
 * 
 * (a wrapper for `components.Option` from `react-select`)
 *
 * @param {object} props - components.Option props.
*/
export const CustomSelectCustomOption = (props) => (
	<components.Option {...props} />
);
