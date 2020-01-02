const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies

const log = (msg) => console.log(msg);
const error = (msg) => log(`${chalk.bgRed('Error')}${chalk.red(' - ')}${msg}`);
const label = (msg) => chalk.green(msg);
const variable = (msg) => log(chalk.cyan(msg));

const capCase = (string) => string.toLowerCase().replace(/\W+/g, '_').split('_').map((item) => item[0].toUpperCase() + item.slice(1)).join('_');

module.exports = {
  log,
  error,
  variable,
  label,
  capCase
}
