import { truncateMiddle, unescapeHTML } from "../../../../scripts/helpers";

test.each([
	{ inputString: 'Lorem ipsum dolor sit amet.', maxLength: 8, expected: 'Lor...t.' },
	{ inputString: 'Lorem', maxLength: 8, expected: 'Lorem' },
	{ inputString: 'Lorem ipsum dolor', maxLength: 10, inputSeparator: ':', expected: 'Lorem:olor' },
	{ inputString: 'Lorem ipsum dolor sit amet.', inputSeparator: '........', maxLength: 8, shouldError: true },
])('tests hextToRgb returns a valid value %s', ({ inputString, maxLength, inputSeparator, expected, shouldError = false }) => {
	if (shouldError) {
		expect(() => truncateMiddle(inputString, maxLength, inputSeparator)).toThrow();
	} else {
		expect(truncateMiddle(inputString, maxLength, inputSeparator)).toBe(expected);
	}
});

test.each([
	{ input: 'Test string.', expected: 'Test string.' },
	{ input: 'Test&#38;string', expected: 'Test&string' },
])('tests hextToRgb returns a valid value %s', ({ input, expected }) => {
	expect(unescapeHTML(input)).toBe(expected);
});
