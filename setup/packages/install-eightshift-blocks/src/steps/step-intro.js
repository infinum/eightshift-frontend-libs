const chalk = require('chalk');
const { log } = console;

const clearConsole = async () => {
  process.stdout.write('\033c'); // eslint-disable-line
}

const writeIntro = async () => {
  log(chalk.green('---------------------------------------------------------------'));
  log(chalk.green(''));
  log(chalk.green('    . .  .  __  ___  __  .    .  '));
  log(chalk.green('    | |\\ | |__   |  |__| |    |  '));
  log(chalk.green('    | | \\|  __|  |  |  | |___ |___'));
  log(chalk.green(''));
  log(chalk.green('     ___ .  __  .  . ___  __  .  . .  __ ___ '));
  log(chalk.green('    |___ | | __ |__|  |  |__  |__| | |__  | '));
  log(chalk.green('    |___ | |__| |  |  |   __| |  | | |    |  '));
  log(chalk.green(''));
  log(chalk.green('    ___  .     __   ___ .  .  __ '));
  log(chalk.green('    |__| |    |  | |    |_/  |__ '));
  log(chalk.green('    |__| |___ |__| |___ | \\   __|'));
  log(chalk.green(''));
  log(chalk.green(''));
  log('Welcome to Install Eightshift Blocks script');
  log(chalk.green(''));
  log('This script lets you easily setup new blocks in your project, assuming it\'s using eightshift-blocks library.');
  log(chalk.green(''));
}

module.exports = {
  clearConsole,
  writeIntro
}