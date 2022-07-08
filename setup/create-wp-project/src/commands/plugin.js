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
  },
  files: { installPath },
  misc: { log, variable },
} = require('../basics');
const { searchReplace } = require('../search-replace');
const { cleanup } = require('../cleanup');
const { scriptArguments } = require('../arguments');
const { installModifiedComposerDependencies, installModifiedNodeDependencies } = require('../dependencies');

exports.command = 'plugin';
exports.desc = 'Setup a new WordPress plugin. Should be run inside your plugins folder (wp-content/plugins).';
exports.builder = scriptArguments;

exports.handler = async (argv) => {
  await clearConsole();
  await writeIntro();
  let step = 1;

  const promptedInfo = await maybePrompt(scriptArguments, argv);
  const requiredPath = await installPath('plugins');
  const projectPath = path.join(requiredPath, promptedInfo.package);
  log('');

  await installStep({
    describe: `${step}. Cloning repo`,
    thisHappens: cloneRepoTo('https://github.com/infinum/eightshift-boilerplate-plugin', projectPath, argv.eightshiftBoilerplateBranch ? argv.eightshiftBoilerplateBranch : ''),
  });
  step++;

  // Install all node packages as is or overwrite frontend-libs
  if (argv.eightshiftFrontendLibsBranch) {
    await installStep({
      describe: `${step}. Installing modified Node dependencies`,
      thisHappens: installModifiedNodeDependencies(projectPath, argv.eightshiftFrontendLibsBranch),
    });
  } else {
    await installStep({
      describe: `${step}. Installing Node dependencies`,
      thisHappens: installNodeDependencies(projectPath),
    });
  }
  step++;

  await installStep({
    describe: `${step}. Replacing theme info`,
    thisHappens: searchReplace(promptedInfo, projectPath),
  });
  step++;

  // Install all composer packages as is or overwrite libs
  if (argv.eightshiftLibsBranch) {
    await installStep({
      describe: `${step}. Installing modified Composer dependencies`,
      thisHappens: installModifiedComposerDependencies(projectPath, argv.eightshiftLibsBranch),
    });
  } else {
    await installStep({
      describe: `${step}. Installing Composer dependencies`,
      thisHappens: installComposerDependencies(projectPath),
    });
  }
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
  log(`1. Activate your new plugin by running ${variable(`wp plugin activate ${variable(promptedInfo.package)}`)}`);
  log(`2. Run ${variable('wp boilerplate --help')} to see what's possible using our WP-CLI commands.`);
  log(`3. If you can't decide what to do, we recommend running ${variable('wp boilerplate init plugin')} inside your new plugin folder.`);
  log('');
  log(`Please read the documentation ${variable('https://infinum.github.io/eightshift-docs/')} if you run into any issues or if you have any questions.`);
  log('');
  log('Best of luck!');
  log('----------------');
  process.exit(0);
};
