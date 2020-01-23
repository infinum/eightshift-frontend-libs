/**
 * Integration test for testing the create-wp-project script.
 *
 * @group integration
 */
const { exec } = require('promisify-child-process');
const { ensureDir } = require('fs-extra');
const del = require('del');

const timeout = 180000;
const testingFolder = './temp';

// When this runs on Travis, make sure to override boilerplate's frontend-libs version
// with the Pull Request branch.
const overrideBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH ? ` eightshiftLibsBranch="${process.env.TRAVIS_PULL_REQUEST_BRANCH}"` : '';

beforeEach(async () => {
  await del(testingFolder);
  await ensureDir(testingFolder);
}, timeout);

afterEach(async () => {
  await del(testingFolder);
}, timeout);

it('tests create-wp-project script (npx version) - creates a theme', async() => { // eslint-disable-line jest/no-focused-tests
  const { err } = await exec(`cd ${testingFolder} && npx create-wp-project@latest --projectName="Test theme" --url="eightshift.local" --description="This is a description for a theme" --noSummary ${overrideBranch}`);

  expect(err).toBeFalsy();
}, timeout);

it('tests create-wp-project script (npx version) - creates a plugin', async() => { // eslint-disable-line jest/no-focused-tests
  const { err } = await exec(`cd ${testingFolder} && npx create-wp-project@latest plugin --projectName="Test plugin" --url="eightshift.local" --description="This is a description for a plugin" --noSummary ${overrideBranch}`);

  expect(err).toBeFalsy();
}, timeout);
