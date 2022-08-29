import { select } from '@wordpress/data';
import { STORE_NAME } from '../editor/store';

export const getDefaultBreakpointNames = () => {
	const breakpoints = select(STORE_NAME).getSettings().globalVariables.breakpoints;

	return Object.entries(breakpoints)
		.sort((a, b) => b[1] - a[1]) // Sort from the largest to the smallest.
		.map(([name]) => name); // Map only names of the breakpoints.
};
