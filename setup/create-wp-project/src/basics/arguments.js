const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
const { log, label } = require('./misc');

/**
 * Output a summary for all user-provided answers and ask for a confirmation.
 *
 * @param {array} answers Array of user-provided answers.
 */
const summary = async(answers) => {
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
const maybePrompt = async(scriptArguments, argv) => {
  let answers = {};
  let confirm = false;

  do {
    for (const argName in scriptArguments) { // eslint-disable-line no-restricted-syntax
      if (Object.prototype.hasOwnProperty.call(scriptArguments, argName)) {
        const argument = {
          ...scriptArguments[argName],
          message: scriptArguments[argName].describe,
        };

        // Use what's provided from CLI, prompt or build the arguments, depending
        // on their settings.
        if (argument.skipPrompt) {
          continue;
        } else if (argument.buildFrom) {
          const { how, name } = argument.buildFrom;
          answers = { ...answers, [argument.name]: how(answers[name]) };
        } else {

          // If argument is provided from CLI use that, otherwise prompt.
          const answer = argv[argName] ? { [argName]: argv[argName] } : await inquirer.prompt(argument); // eslint-disable-line no-await-in-loop
          answers = { ...answers, ...answer };
        }
      }
    }

    // Skip summary if noSummary argument is provided
    if (!argv.noSummary) {
      confirm = await summary(answers); // eslint-disable-line no-await-in-loop
    } else {
      confirm = true;
    }
  } while (confirm !== true);

  return answers;
};

module.exports = {
  maybePrompt,
};
