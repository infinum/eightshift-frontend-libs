#!/usr/bin/env node
require('yargs') // eslint-disable-line no-unused-expressions
  .commandDir('./src/commands')
  .demandCommand()
  .help()
  .argv;
