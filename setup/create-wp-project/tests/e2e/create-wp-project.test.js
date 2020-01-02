const { exec } = require('promisify-child-process');
const timeout = 180000;
const del = require('del'); // eslint-disable-line

const testingFolder = 'temp';

beforeEach(async() => {
  await del(`./${testingFolder}`);
});

afterEach(async() => {
  await del(`./${testingFolder}`);
});

// Test readdirAsync
test('test create-wp-project script (local version)', async() => {
  const { stdout, stderr } = await exec(
    `cd ${testingFolder} &&
    node ~/my-packages/eightshift-frontend-libs/setup/create-wp-project/create-wp-project.js --projectName="Test Project" --url="asdasd.local" --description="This is a description" --noSummary`
  );
  console.log('stdout', stdout);
  console.log('stderr', stderr);
}, timeout);
