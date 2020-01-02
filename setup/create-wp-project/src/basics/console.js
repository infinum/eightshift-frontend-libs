const ora = require('ora'); // eslint-disable-line import/no-extraneous-dependencies
const emoji = require('node-emoji'); // eslint-disable-line import/no-extraneous-dependencies
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const prompt = require('prompt-sync')(); // eslint-disable-line import/no-extraneous-dependencies
const {
  log,
  error,
  variable,
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
const installStep = async({describe, thisHappens, isFatal = false}) => {
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
      process.exit();
    }
  });
};

/**
 * Outputs a success message after successfully setting up the plugin.
 */
const installStepFinal = async() => {
  log('');
  log(`${emoji.get('tada')}${emoji.get('tada')}${emoji.get('tada')} Your plugin is now ready! ${emoji.get('tada')}${emoji.get('tada')}${emoji.get('tada')}`);
  log('');
  log(`Please run ${variable('npm start')} to start developing.`);
  log('');
  log(chalk.red('---------------------------------------------------------------'));
};

/**
 * Prompts the user for all things defined in whatToPromptFor.
 */
const promptData = async(whatToPromptFor) => {
  const data = {};
  whatToPromptFor.forEach(async(singlePrompt) => {
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
  process.stdout.write('\033c'); // eslint-disable-line
}

/**
 * Writes the Boilerplate intro.
 */
const writeIntro = async () => {
  console.log('');
  console.log(await figlet('Eightshift Boilerplate'));
  console.log('');
}

module.exports = {
  promptFor,
  installStep,
  installStepFinal,
  promptData,
  clearConsole,
  writeIntro
}

