/**
 * Unit tests for misc.js
 *
 * @group unit
 */
const { capCase } = require('../../../src/basics/misc.js');

test('Should make cap case of: aaa aaa', () => {
  expect(capCase('aaa aaa')).toBe('Aaa_Aaa');
});

test('Should make cap case of: AAA', () => {
  expect(capCase('AAA')).toBe('Aaa');
});

test('Should make cap case of: Aaa Aaa', () => {
  expect(capCase('Aaa Aaa')).toBe('Aaa_Aaa');
});

test('Should do nothing for: 111', () => {
  expect(capCase('111')).toBe('111');
});
