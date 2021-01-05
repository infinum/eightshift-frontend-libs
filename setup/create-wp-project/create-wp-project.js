#!/usr/bin/env node
require('yargs')
  .commandDir('./src/commands')
  .demandCommand()
  .help()
  .argv;
