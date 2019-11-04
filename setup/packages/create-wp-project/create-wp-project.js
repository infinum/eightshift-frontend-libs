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
    wpCoreDownload,
  },
  arguments: { maybePrompt },
  files: { fullPath },
  misc: { log },
} = require('eightshift-scripts');

const { scriptArguments } = require('./src/arguments');
const { searchReplace } = require('./src/search-replace');
const { copyBlocksFolder } = require('./src/copy-blocks');
const { cleanup } = require('./src/cleanup');
const { copyAll } = require('./src/files');

const run = async () => {
  await clearConsole();

  const promptedInfo = await maybePrompt(scriptArguments);
  const tempPath = path.join(fullPath, promptedInfo.package);

  await installStep({
    describe: '1. Cloning repo',
    thisHappens: cloneRepoTo('https://github.com/infinum/eightshift-boilerplate-internal.git', tempPath),
    isFatal: true,
  });

  await installStep({
    describe: '2. Moving all files',
    thisHappens: copyAll(tempPath, fullPath),
    isFatal: true,
  });

  await installStep({
    describe: '3. Installing Composer dependencies',
    thisHappens: installComposerDependencies(),
    isFatal: true,
  });

  await installStep({
    describe: '4. Installing blocks',
    thisHappens: copyBlocksFolder(fullPath),
    isFatal: true,
  });

  await installStep({
    describe: '5. Replacing theme info',
    thisHappens: searchReplace(promptedInfo),
    isFatal: true,
  });

  await installStep({
    describe: '6. Updating composer autoloader',
    thisHappens: updateComposerAutoloader(),
    isFatal: true,
  });

  await installStep({
    describe: '7. Installing Node dependencies',
    thisHappens: installNodeDependencies(),
    isFatal: true,
  });

  await installStep({
    describe: '8. Building assets',
    thisHappens: buildAssets(),
    isFatal: true,
  });

  await installStep({
    describe: '9. (Optional) Installing WordPress core',
    thisHappens: wpCoreDownload(),
  });

  await installStep({
    describe: '10. Cleaning up',
    thisHappens: cleanup(tempPath),
    isFatal: true,
  });

  log('----------------');
  log('Success!!!');
  log('');
  log('Please visit your local site url to finalize WordPress installation (if you don\'t have WordPress already setup). After you\'ve installed WordPress, please do the following:');
  log(`1. In wp-config.php - Make sure to define your env const (${promptedInfo.env}) to 'develop'`);
  log('2. In wp-config.php - Make sure to require wp-config-project.php (at the end of the file)');
  log('3. Activate your new theme');
  log('----------------');
};

run();
