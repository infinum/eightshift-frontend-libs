export const truncateMiddle = (input, maxLength, separator = '...') => {
	if (input?.length <= maxLength) {
		return input;
	}

	return `${input.slice(0, maxLength / 2)}${separator}${input.slice(-1 * (maxLength / 2 - 3))}`;
}
