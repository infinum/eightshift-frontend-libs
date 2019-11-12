const { exec } = require('promisify-child-process');
const del = require('del');

const composerTimeout = 60000;

const setupComposer = async(moduleName) => {
  await exec('composer init --no-interaction --stability="dev"');
  await exec(`composer require ${moduleName}`);
}

const tearDownComposer = async(moduleName) => {
  await exec(`composer remove ${moduleName}`);
  await exec('composer update');
  await del(['composer.json']);
  await del(['vendor']);
}

module.exports = {
  composerTimeout,
  setupComposer,
  tearDownComposer
}