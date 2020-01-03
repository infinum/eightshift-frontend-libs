const ora = require('ora');
const emoji = require('node-emoji');
const prompt = require('prompt-sync')();
const {
  log,
  error,
  label,
  capCase,
} = require('./misc.js');
const figlet = require('figlet-promised');

/**
 * Prompts a user for something
 *
 * @param {object} settings
 */
const promptFor = ({
  icon = '',
  title,
  promptLabel,
  minLength = 0,
}) => {
  let userInput = '';

  label(`${emoji.get(icon) || ''} ${title}`);
  do {
    userInput = prompt(`${promptLabel}: `);

    if (userInput.length <= minLength) {
      error(error);
    }
  } while (userInput.length <= minLength && userInput !== 'exit');
  label('');
  if (userInput === 'exit') {
    log('Exiting script...');
    process.exit();
  }

  return userInput;
};

/**
 * Performs an install step with the ora spinner.
 */
const installStep = async ({ describe, thisHappens, isFatal = false }) => {
  const spinner = ora(describe).start();

  if (!thisHappens) {
    throw new Error(`Missing 'thisHappens' parameter for step ${describe}, don't know what needs to be done at this step, aborting.`);
  }

  await thisHappens.then(() => {
    spinner.succeed();
  }).catch((exception) => {
    spinner.fail();
    error(exception);

    if (isFatal) {
      error(`'${describe}' was a required step, exiting now.`);
      process.exit(1);
    }
  });
};

/**
 * Prompts the user for all things defined in whatToPromptFor.
 */
const promptData = async (whatToPromptFor) => {
  const data = {};
  whatToPromptFor.forEach(async (singlePrompt) => {
    data[singlePrompt.key] = promptFor(singlePrompt);
  });

  // Implicitly build other things we need from the name.
  if (data.name) {
    data.packageName = data.name.toLowerCase().split(' ').join('-');
    data.namespace = capCase(data.packageName);
  }

  return data;
};

/**
 * Empties the console.
 */
const clearConsole = async () => {
  process.stdout.write('\x1Bc');
};

/**
 * Writes the Boilerplate intro.
 */
const writeIntro = async () => {
  log('');
  log(await figlet('Eightshift Boilerplate'));
  log('');
};

module.exports = {
  promptFor,
  installStep,
  promptData,
  clearConsole,
  writeIntro,
};

