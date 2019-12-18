#!/usr/bin/env node

const { clearConsole, writeIntro } = require('./src/steps/step-intro.js');
const { preflightChecklist } = require('./src/steps/step-checklist.js');
const { promptForBlock } = require('./src/steps/step-prompt.js');
const { installBlock, installBlockDependencies } = require('./src/steps/step-install.js');
const {
  console: { installStep },
} = require('eightshift-scripts');

const run = async() => {

  await installStep({
    describe: 'Running some checks to see if we can proceed...',
    thisHappens: preflightChecklist(),
    isFatal: true,
  });

  await clearConsole();
  await writeIntro();

  const blockName = await promptForBlock();

  await installStep({
    describe: '1. Installing block',
    thisHappens: installBlock(blockName),
    isFatal: true,
  });

  await installStep({
    describe: '2. Installing block dependencies',
    thisHappens: installBlockDependencies(),
    isFatal: true,
  });
};

run();
