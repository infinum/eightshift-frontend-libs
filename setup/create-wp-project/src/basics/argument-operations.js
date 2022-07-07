const inquirer = require('inquirer');
const { log, label, variable, error } = require('./misc');
const { eightshiftForbiddenKeywords } = require('./variables');

/**
 * Output a summary for all user-provided answers and ask for a confirmation.
 *
 * @param  {array} answers Array of user-provided answers.
 * @return {bool}
 */
const summary = async(answers) => {
  log('');
  log(label('Summary: '));
  Object.keys(answers).forEach((key) => {
    log(`- ${key}: ${variable(answers[key])}`);
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
 * @param  {array} scriptArguments Array of defined script arguments.
 * @param  {array} argv            Array of CLI arguments.
 * @return {array}
 */
const maybePrompt = async(scriptArguments, argv) => {
  let answers = {};
  let confirm = false;
  let prompted = false;
  let mustPrompt = false;
  const argsArray = Object.keys(scriptArguments);
  
  do {
    for (let i = 0; i < argsArray.length - 1; i++) {
      const argName = argsArray[i];

      if (Object.prototype.hasOwnProperty.call(scriptArguments, argName)) {
        const argument = {
          ...scriptArguments[argName],
          message: scriptArguments[argName].describe,
        };

        // Use what's provided from CLI, prompt or build the arguments, depending
        // on their settings.
        if (argument.skipPrompt) {
          continue;
        } else if (typeof(argv[argName]) === "undefined" && argument.buildFrom) {
          const { how, name } = argument.buildFrom;
          answers = { ...answers, [argument.name]: how(answers[name]) };
        } else {

          // If argument is provided from CLI use that, otherwise prompt.
          const answer = argv[argName] && !mustPrompt ? { [argName]: argv[argName] } : await inquirer.prompt(argument);

          if (typeof (argv[argName]) === "undefined") {
            prompted = true;
          }

          // Check if the project name matches a forbidden keyword.
          if (argName === 'projectName' && !projectNameValidator(answer[argName], false)) {
            error(`Project name '${answer.projectName}' is forbidden. Choose a different name.`);
            mustPrompt = true;
            i--;
            continue;
          } else {
            mustPrompt = false;
          }

          answers = { ...answers, ...answer };
        }
      }
    }

    // Skip summary if noSummary argument is provided
    if (!argv.noSummary) {
      confirm = await summary(answers);

      if (!confirm && prompted === false) {
        process.exit(0);
      }

      log('');
    } else {
      confirm = true;
    }
  } while (confirm !== true);

  return answers;
};

/**
 * Converts a y/n prompt question to a boolean
 *
 * @param  {string} prompt Answer to prompted y/n question
 * @return {bool}
 */
const promptToBool = async(prompt) => {
  const lwrPrompt = prompt.toLowerCase();

  return lwrPrompt === 'y' ||
    lwrPrompt === 'yes' ||
    lwrPrompt === '1' ||
    lwrPrompt === 'confirm' ||
    lwrPrompt === 'i do';
};

/**
 * Checks if entered project named is the same as forbidden keywords.
 *
 * @param  {string} input String entered in prompt
 * @return {bool}
 */
const projectNameValidator = (input) => {
	if (eightshiftForbiddenKeywords.find((word) => word === input)) {
    return false;
	}
	return true;
};

module.exports = {
	maybePrompt,
	promptToBool,
	projectNameValidator,
};
