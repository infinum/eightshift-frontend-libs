#!/usr/bin/env node
const path = require('path');

const {
  console: {
    clearConsole,
    installStep,
    writeIntro,
  },
  argumentOperations: {
    maybePrompt,
  },
  commandLine: {
    cloneRepoTo,
    installNodeDependencies,
    installComposerDependencies,
    updateComposerAutoloader,
    buildAssets,
  },
  files: { fullPath },
  misc: { log, variable },
} = require('../basics');
const { searchReplace } = require('../search-replace');
const { copyBlocks, removeBlocksSupport } = require('../blocks');
const { copyAssets } = require('../assets');
const { cleanup } = require('../cleanup');
const { scriptArguments } = require('../arguments');

exports.command = 'plugin';
exports.desc = 'Setup a new WordPress plugin. Should be run inside your plugins folder (wp-content/plugins).';
exports.builder = scriptArguments;

exports.handler = async (argv) => {
  await clearConsole();
  await writeIntro();
  let step = 1;

  const promptedInfo = await maybePrompt(scriptArguments, argv);
  const projectPath = path.join(fullPath, promptedInfo.package);
  log('');

  await installStep({
    describe: `${step}. Cloning repo`,
    thisHappens: cloneRepoTo('https://github.com/infinum/eightshift-boilerplate-plugin', projectPath),
  });
  step++;

  await installStep({
    describe: `${step}. Installing Node dependencies`,
    thisHappens: installNodeDependencies(projectPath),
  });
  step++;

  await installStep({
    describe: `${step}. Installing Composer dependencies`,
    thisHappens: installComposerDependencies(projectPath),
  });
  step++;

  await installStep({
    describe: `${step}. Copying assets`,
    thisHappens: copyAssets(projectPath),
    isFatal: true,
  });
  step++;

  if (argv.noBlocks) {
    await installStep({
      describe: `${step}. Removing blocks`,
      thisHappens: removeBlocksSupport(projectPath),
    });
    step++;
  } else {
    await installStep({
      describe: `${step}. Installing blocks`,
      thisHappens: copyBlocks(projectPath),
    });
    step++;
  }

  await installStep({
    describe: `${step}. Replacing theme info`,
    thisHappens: searchReplace(promptedInfo, projectPath),
  });
  step++;

  await installStep({
    describe: `${step}. Updating composer autoloader`,
    thisHappens: updateComposerAutoloader(projectPath),
  });
  step++;

  await installStep({
    describe: `${step}. Building assets`,
    thisHappens: buildAssets(projectPath),
    isFatal: true,
  });
  step++;

  await installStep({
    describe: `${step}. Cleaning up`,
    thisHappens: cleanup(projectPath),
  });
  step++;

  log('----------------');
  log('Success!!!');
  log('');
  log('Please do the following steps manually to complete the setup:');
  log(`1. In ${variable('wp-config.php')} - Make sure to define your env const ${variable(promptedInfo.env)} to ${variable('develop')} like so: <?php define( '${promptedInfo.env}', 'develop' ); ?>`);
  log(`2. In ${variable('wp-config.php')} - Make sure to require ${variable('wp-config-project.php')} (at the end of the file)`);
  log('3. Activate your new theme');
  log('');
  log(`Note that only some basic Gutenberg blocks were copied. If you need more blocks, please go to ${variable('https://infinum.github.io/eightshift-frontend-libs/storybook')}. There you will find instructions on how to add other blocks to your project.`);
  log('----------------');
  process.exit(0);
};
