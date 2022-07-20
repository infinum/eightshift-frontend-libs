import { components } from 'react-select';

/**
 * Custom multiple value remove button for CustomSelect.
 * 
 * (a wrapper for `components.MultiValueRemove` from `react-select`)
 *
 * @param {object} props - components.MultiValueRemove props.
*/
export const CustomSelectCustomMultipleValueRemoveButton = (props) => (
	<components.MultiValueRemove {...props} />
);
