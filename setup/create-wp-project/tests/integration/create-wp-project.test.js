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

beforeEach(async() => {
  await del(testingFolder);
  await ensureDir(testingFolder);
}, timeout);

afterEach(async() => {
  await del(testingFolder);
}, timeout);

it('tests create-wp-project script (local version) - creates a theme', async() => {
  const { err, stdout, stderr } = await exec(
    `cd ${testingFolder} &&
    node ~/my-packages/eightshift-frontend-libs/setup/create-wp-project/create-wp-project.js --projectName="Test Project" --url="eightshift.local" --description="This is a description" --noSummary`
  );

  expect(err).toBeFalsy();
}, timeout);

// it('tests create-wp-project script (npx version) - creates a theme', async() => {
//   const { stdout, stderr } = await exec(
//     `cd ${testingFolder} &&
//     npx create-wp-project@latest --projectName="Test project" --url="eightshift.local" --description="This is a description" --noSummary`
//   );
// }, timeout);
