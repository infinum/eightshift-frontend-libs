import {
	camelCase,
	pascalCase,
	snakeCase,
	kebabCase,
	isEmpty,
	lowerFirst,
	upperFirst,
	has,
	isPlainObject,
	isObject,
	isEqual,
} from '../../../../scripts/helpers/es-dash';

test.each([
	{ input: 'Test string.', expected: 'testString' },
	{ input: 'Test string.', expected: 'testString' },
	{ input: '--TEST-STRING--', expected: 'testString' },
	{ input: '__TEST_STRING__', expected: 'testString' },
	{ input: '-Test-string_', expected: 'testString' },
	{ input: 'test-string', expected: 'testString' },
	{ input: 'testString', expected: 'testString' },
	{ input: 'TestString', expected: 'testString' },
	{ input: 'TESTstring', expected: 'tesTstring' },
	{ input: null, expected: '' },
])('camelCase gives a correct output %s', ({ input, expected }) => {
	expect(camelCase(input)).toBe(expected);
});

test.each([
	{ input: 'Test string.', expected: 'TestString' },
	{ input: 'Test string.', expected: 'TestString' },
	{ input: '--TEST-STRING--', expected: 'TestString' },
	{ input: '__TEST_STRING__', expected: 'TestString' },
	{ input: '-Test-string_', expected: 'TestString' },
	{ input: 'test-string', expected: 'TestString' },
	{ input: 'testString', expected: 'TestString' },
	{ input: 'TestString', expected: 'TestString' },
	{ input: 'TESTstring', expected: 'TesTstring' },
	{ input: null, expected: '' },
])('PascalCase gives a correct output %s', ({ input, expected }) => {
	expect(pascalCase(input)).toBe(expected);
});

test.each([
	{ input: 'Test string.', expected: 'test-string' },
	{ input: 'Test string.', expected: 'test-string' },
	{ input: '--TEST-STRING--', expected: 'test-string' },
	{ input: '__TEST_STRING__', expected: 'test-string' },
	{ input: '-Test-string_', expected: 'test-string' },
	{ input: 'test-string', expected: 'test-string' },
	{ input: 'testString', expected: 'test-string' },
	{ input: 'TestString', expected: 'test-string' },
	{ input: 'TESTstring', expected: 'tes-tstring' },
	{ input: null, expected: '' },
])('kebab-case gives a correct output %s', ({ input, expected }) => {
	expect(kebabCase(input)).toBe(expected);
});

test.each([
	{ input: 'Test string.', expected: 'test_string' },
	{ input: 'Test string.', expected: 'test_string' },
	{ input: '--TEST-STRING--', expected: 'test_string' },
	{ input: '__TEST_STRING__', expected: 'test_string' },
	{ input: '-Test-string_', expected: 'test_string' },
	{ input: 'test-string', expected: 'test_string' },
	{ input: 'testString', expected: 'test_string' },
	{ input: 'TestString', expected: 'test_string' },
	{ input: 'TESTstring', expected: 'tes_tstring' },
	{ input: null, expected: '' },
])('snake_case gives a correct output %s', ({ input, expected }) => {
	expect(snakeCase(input)).toBe(expected);
});

test.each([
	{ input: 'Test string.', expected: 'Test string.', },
	{ input: 'Test string.', expected: 'Test string.', },
	{ input: '--TEST-STRING--', expected: '--TEST-STRING--', },
	{ input: '__TEST_STRING__', expected: '__TEST_STRING__', },
	{ input: '-Test-string_', expected: '-Test-string_', },
	{ input: 'test-string', expected: 'Test-string', },
	{ input: 'testString', expected: 'TestString', },
	{ input: 'TestString', expected: 'TestString', },
	{ input: 'TESTstring', expected: 'TESTstring', },
	{ input: '1TESTstring', expected: '1TESTstring', },
	{ input: null, expected: '' },
])('upperFirst gives a correct output %s', ({ input, expected }) => {
	expect(upperFirst(input)).toBe(expected);
});

test.each([
	{ input: 'Test string.', expected: 'test string.', },
	{ input: 'Test string.', expected: 'test string.', },
	{ input: '--TEST-STRING--', expected: '--TEST-STRING--', },
	{ input: '__TEST_STRING__', expected: '__TEST_STRING__', },
	{ input: '-Test-string_', expected: '-Test-string_', },
	{ input: 'test-string', expected: 'test-string', },
	{ input: 'testString', expected: 'testString', },
	{ input: 'TestString', expected: 'testString', },
	{ input: 'TESTstring', expected: 'tESTstring', },
	{ input: '1TESTstring', expected: '1TESTstring', },
	{ input: null, expected: '' },
])('upperFirst gives a correct output %s', ({ input, expected }) => {
	expect(lowerFirst(input)).toBe(expected);
});

test.each([
	{ input: {}, expected: true },
	{ input: [], expected: true },
	{ input: '', expected: true },
	{ input: { a: 1 }, expected: false },
	{ input: [1, 2, 3], expected: false },
	{ input: null, expected: true },
])('isEmpty gives a correct output %s', ({ input, expected }) => {
	expect(isEmpty(input)).toBe(expected);
});

test.each([
	{ input1: { a: 1 }, input2: 'a', expected: true },
	{ input1: { a: 1 }, input2: 'b', expected: false },
	{ input1: { a: { b: 2 } }, input2: 'a.b', expected: true },
	{ input1: { a: { b: 3 } }, input2: 'a.c', expected: false },
])('has gives a correct output %s', ({ input1, input2, expected }) => {
	expect(has(input1, input2)).toBe(expected);
});

test.each([
	{ input: { a: 2 }, expected: true },
	{ input: 'Lorem', expected: false },
	{ input: [], expected: false },
	{ input: new Boolean(), expected: false },
])('isPlainObject gives a correct output %s', ({ input, expected }) => {
	expect(isPlainObject(input)).toBe(expected);
});

test.each([
	{ input: {}, expected: true },
	{ input: [1, 2, 3], expected: true },
	{ input: () => { }, expected: true },
	{ input: null, expected: false },
])('isObject gives a correct output %s', ({ input, expected }) => {
	expect(isObject(input)).toBe(expected);
});

test.each([
	{ input1: { a: 1 }, input2: { a: 1 }, expected: true },
	{ input1: { a: 1 }, input2: { a: 2 }, expected: false },
	{ input1: { a: 1 }, input2: 'b', expected: false },
])('isEqual gives a correct output %s', ({ input1, input2, expected }) => {
	expect(isEqual(input1, input2)).toBe(expected);
});
