#!/usr/bin/env node
const path = require('path');

const {
  console: {
    clearConsole,
    installStep,
    writeIntro,
  },
  arguments: { maybePrompt },
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
const { copyBlocksFolder } = require('../blocks');
const { cleanup } = require('../cleanup');
const { scriptArguments } = require('../arguments');

exports.command = '*';
exports.desc = 'Setup a new WordPress theme (or plugin soon!). Should be run inside your theme folder (wp-content/themes).';
exports.builder = scriptArguments;

exports.handler = async (argv) => {
  await clearConsole();
  await writeIntro();

  const promptedInfo = await maybePrompt(scriptArguments, argv);
  const projectPath = path.join(fullPath, promptedInfo.package);

  await installStep({
    describe: '1. Cloning repo',
    thisHappens: cloneRepoTo('https://github.com/infinum/eightshift-boilerplate.git', projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '2. Installing Node dependencies',
    thisHappens: installNodeDependencies(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '3. Installing Composer dependencies',
    thisHappens: installComposerDependencies(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '4. Installing blocks',
    thisHappens: copyBlocksFolder(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '5. Replacing theme info',
    thisHappens: searchReplace(promptedInfo, projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '6. Updating composer autoloader',
    thisHappens: updateComposerAutoloader(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '7. Building assets',
    thisHappens: buildAssets(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '8. Cleaning up',
    thisHappens: cleanup(projectPath),
    isFatal: true,
  });

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
