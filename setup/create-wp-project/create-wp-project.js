#!/usr/bin/env node
const path = require('path');
const {
  console: {
    installStep,
    clearConsole,
  },
  commandLine: {
    cloneRepoTo,
    installNodeDependencies,
    installComposerDependencies,
    updateComposerAutoloader,
    buildAssets,
  },
  arguments: { maybePrompt },
  files: { fullPath },
  misc: { log },
} = require('./src/basics');

const { scriptArguments } = require('./src/arguments');
const { searchReplace } = require('./src/search-replace');
const { copyBlocksFolder } = require('./src/copy-blocks');
const { cleanup } = require('./src/cleanup');

const run = async() => {
  await clearConsole();

  const promptedInfo = await maybePrompt(scriptArguments);
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
  log(`1. In wp-config.php - Make sure to define your env const (${promptedInfo.env}) to 'develop'`);
  log('2. In wp-config.php - Make sure to require wp-config-project.php (at the end of the file)');
  log('3. Activate your new theme');
  log('----------------');
};

run();
