import { ucfirst } from "../../../../scripts/editor/utility";

test.each([
	{input: 'aaa', expected: 'Aaa'},
	{input: 'snake_case', expected: 'Snake_case'},
	{input: 'camelCase', expected: 'CamelCase'},
	{input: '111numbers', expected: '111numbers'},
	{input: '"$#!"$!"', expected: '"$#!"$!"'},
	{input: '', expected: ''},
])('tests ucfirst always returns the first letter %s', ({input, expected}) => {
	expect(ucfirst(input)).toBe(expected);
});
