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
  files: { fullPath },
  misc: { log, variable },
} = require('../basics');
const { searchReplace } = require('../search-replace');
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
    describe: `${step}. Replacing theme info`,
    thisHappens: searchReplace(promptedInfo, projectPath),
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
  log('4. Run wp boilerplate --help');
  log('');
  log(`Please read the documentation ${variable('https://infinum.github.io/eightshift-docs/')} if you run into any issues or if you have any questions.`);
  log('');
  log('Best of luck!');
  log('----------------');
  process.exit(0);
};
