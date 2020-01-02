const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
const { log, label } = require('./misc');

/**
 * Output a summary for all user-provided answers and ask for a confirmation.
 *
 * @param {array} answers Array of user-provided answers.
 */
const summary = async (answers) => {
  log('');
  log(label('Summary: '));
  Object.keys(answers).forEach((key) => {
    log(`- ${key}: ${chalk.cyan(answers[key])}`);
  });

  const { confirmSummary } = await inquirer.prompt({
    name: 'confirmSummary',
    type: 'confirm',
    message: 'Looks good?',
  });

  return confirmSummary;
};

/**
 * Should prompt the user for all scriptArguments.
 *
 * TODO: Only prompt for things not provided as arguments on command line.
 *
 * @param {array} scriptArguments Array of defined script arguments.
 */
const maybePrompt = async (scriptArguments) => {
  let answers = {};
  let confirm = false;
  do {
    for (const argument of scriptArguments) { // eslint-disable-line no-restricted-syntax
      if (argument.buildFrom) {
        const { how, name } = argument.buildFrom;
        answers = { ...answers, [argument.name]: how(answers[name]) };
      } else {
        // eslint-disable-next-line no-await-in-loop
        const promptAnswer = await inquirer.prompt(argument);
        answers = { ...answers, ...promptAnswer };
      }
    }

    confirm = await summary(answers); // eslint-disable-line no-await-in-loop
    log('');
  } while (confirm !== true);

  return answers;
};

module.exports = {
  maybePrompt,
};
