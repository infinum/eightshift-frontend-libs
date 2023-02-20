/**
 * Utils for `simpleValue`-capable components.
*/

/**
 * Handles getting the current value.
 *
 * @param {boolean} simpleValue If `simpleValue` is selected.
 * @param {any} value Current value.
 * @param {array<any>} options Options passed to the component.
 *
 * @returns Appropriate output for the given input combination.
 */
export const getValue = (simpleValue, value, options) => {
	if (!simpleValue) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((value) => options?.find(({value: itemValue}) => itemValue === value));
	}

	return options?.find(({value: itemValue}) => itemValue === value);
};

/**
 * Handles the `onChange` callback.
 *
 * @param {*} simpleValue If `simpleValue` is selected.
 * @param {*} newValue The new value to be set.
 * @param {callback} onChange The `onChange` callback passed to the component.
 * @returns
 */
export const customOnChange = (simpleValue, newValue, onChange) => {
	if (!simpleValue) {
		onChange(newValue);
		return;
	}

	if (Array.isArray(newValue)) {
		onChange(newValue.map((item) => item?.value));
		return;
	}

	onChange(newValue?.value);
};
