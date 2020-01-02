/**
 * Unit tests for files.js
 *
 * @group unit
 */
const { scriptArguments } = require('../../src/arguments.js');

it('tests PACKAGE argument build method', async() => {
  const packageName = scriptArguments.package;
  expect(packageName.buildFrom.how('Test name 1')).toBe('test-name-1');
  expect(packageName.buildFrom.how('baNana 1')).toBe('banana-1');
  expect(packageName.buildFrom.how('#2a24 ?-.,b')).toBe('2a24--b');
});

it('tests NAMESPACE argument build method', async() => {
  const { namespace } = scriptArguments;
  expect(namespace.buildFrom.how('banana')).toBe('Banana');
  expect(namespace.buildFrom.how('Test name 1')).toBe('Test_Name_1');
  expect(namespace.buildFrom.how('TEST name 1')).toBe('Test_Name_1');
  expect(namespace.buildFrom.how('TEST name ab')).toBe('Test_Name_Ab');
  expect(namespace.buildFrom.how('baNana a')).toBe('Banana_A');
  expect(namespace.buildFrom.how('#2a24 ?-.,b_ca#,')).toBe('2a24_B_Ca');
});

it('tests PREFIX argument build method', async() => {
  const { prefix } = scriptArguments;
  expect(prefix.buildFrom.how('banana')).toBe('BAN');
  expect(prefix.buildFrom.how('Test name 1')).toBe('TN1');
  expect(prefix.buildFrom.how('TEST name ab')).toBe('TNA');
  expect(prefix.buildFrom.how('testName a')).toBe('TA');
});

it('tests ENV argument build method', async() => {
  const { env, prefix } = scriptArguments;
  expect(env.buildFrom.how(prefix.buildFrom.how('banana'))).toBe('BAN_ENV');
  expect(env.buildFrom.how(prefix.buildFrom.how('TEST name ab'))).toBe('TNA_ENV');
});

it('tests PROJECT_PREFIX argument build method', async() => {
  const { projectPrefix } = scriptArguments;
  expect(projectPrefix.buildFrom.how('TNA')).toBe('tna');
  expect(projectPrefix.buildFrom.how('TA1')).toBe('ta1');
});
