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
const testingFolder = './temp-theme';

beforeEach(async () => {
  await del(testingFolder);
  await ensureDir(testingFolder);
}, timeout);

afterEach(async () => {
  await del(testingFolder);
}, timeout);

it('tests create-wp-project script (npx version) - creates a theme', async() => {

  // When this runs on Travis, make sure to override boilerplate's frontend-libs version
  // with the Pull Request branch.
  log('--- Debug environment vars: ', process.env);
  const overrideBranch = process.env.TRAVIS_PULL_REQUEST_BRANCH ? ` eightshiftLibsBranch="${process.env.TRAVIS_PULL_REQUEST_BRANCH}"` : '';

  const command = `npx create-wp-project@latest --projectName="Test theme" --url="eightshift.local" --description="This is a description for a theme" --noSummary ${overrideBranch}`;
  log('Running command: ', command);
  const { err } = await exec(`cd ${testingFolder} && ${command}`);

  expect(err).toBeFalsy();
}, timeout);
