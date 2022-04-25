import { hexToRgb } from "../../../../scripts/editor/css-variables";

test.each([
	{input: '', expected: '0 0 0'},
	{input: '#fff', expected: '255 255 255'},
	{input: 'invalid', expected: '0 0 0'},
	{input: '#ooolll', expected: '0 0 0'},
	{input: '#', expected: '0 0 0'},
	{input: '#123456', expected: '18 52 86'},
])('tests hextToRgb returns a valid value %s', ({input, expected}) => {
	expect(hexToRgb(input)).toBe(expected);
});
