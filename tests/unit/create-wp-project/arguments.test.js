/**
 * Unit tests for files.js
 *
 * @group unit
 */
const { scriptArguments } = require('../../../setup/create-wp-project/src/arguments.js');

it('tests PACKAGE argument build method', async() => {
  const packageName = scriptArguments.package;
  expect(packageName.buildFrom.how('Test name 1')).toBe('test-name-1');
  expect(packageName.buildFrom.how('baNana 1')).toBe('banana-1');
  expect(packageName.buildFrom.how('#2a24 ?-.,b')).toBe('2a24--b');
});

it('tests NAMESPACE argument build method', async() => {
  const { namespace } = scriptArguments;
  expect(namespace.buildFrom.how('banana')).toBe('Banana');
  expect(namespace.buildFrom.how('Test name 1')).toBe('TestName1');
  expect(namespace.buildFrom.how('TEST name 1')).toBe('TestName1');
  expect(namespace.buildFrom.how('TEST name ab')).toBe('TestNameAb');
  expect(namespace.buildFrom.how('TEST name Ab')).toBe('TestNameAb');
  expect(namespace.buildFrom.how('baNana a')).toBe('BananaA');
  expect(namespace.buildFrom.how('#2a24 ?-.,b_ca#,')).toBe('2a24BCa');
});
