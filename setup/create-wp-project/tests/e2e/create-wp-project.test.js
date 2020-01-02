const { exec } = require('promisify-child-process');
const timeout = 180000;

beforeEach(() => {
});

afterEach(async () => {
  // cleanup
});


// Test readdirAsync
test('that create-wp-project script completes successfully', async() => {
  const { stdout, stderr } = await exec('npx create-wp-project');
  console.log('stdout', stdout);
  console.log('stderr', stderr);
}, timeout);
