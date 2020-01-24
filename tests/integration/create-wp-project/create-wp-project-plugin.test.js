/**
 * Integration test for testing the create-wp-project script.
 *
 * @group integration
 */
const { exec } = require('promisify-child-process');
const { ensureDir } = require('fs-extra');
const del = require('del');

const { log } = console;
const timeout = 180000;
const testingFolder = './temp-plugin';

beforeEach(async () => {
  await del(testingFolder);
  await ensureDir(testingFolder);
}, timeout);

afterEach(async () => {
  await del(testingFolder);
}, timeout);

it('tests create-wp-project script (npx version) - creates a plugin', async() => {

  // When this runs on Travis, make sure to override boilerplate's frontend-libs version
  // with the Pull Request branch.
  const overrideBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH ? ` --eightshiftFrontendLibsBranch="${process.env.TRAVIS_PULL_REQUEST_BRANCH}"` : '';

  const command = `npx create-wp-project@latest plugin --projectName="Test plugin" --url="eightshift.local" --description="This is a description for a plugin" --noSummary ${overrideBranch}`;
  log('Running command: ', command);
  log('Running command: ', command);
  const { err } = await exec(`cd ${testingFolder} && ${command}`);

  expect(err).toBeFalsy();
}, timeout);
