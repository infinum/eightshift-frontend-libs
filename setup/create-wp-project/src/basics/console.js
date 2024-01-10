const ora = require('ora');
const emoji = require('node-emoji');
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const {
	log,
	error,
	label,
	capCase,
} = require('./misc.js');
const figlet = require('figlet');

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
const installStep = async ({ describe, thisHappens, isFatal = true }) => {
	const spinner = ora({ text: describe, color: 'blue' }).start();

	if (!thisHappens) {
		throw new Error(`Missing 'thisHappens' parameter for step ${describe}, don't know what needs to be done at this step, aborting.`);
	}

	await thisHappens.then(() => {
		spinner.succeed();
	}).catch((exception) => {
		spinner.fail();
		error(exception);

		if (isFatal) {
			error(`'${describe}' was a required step, exiting.`);
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
	const figletOpts = {
		font: 'ANSI Regular',
		width: 74,
		whitespaceBreak: true,
		verticalLayout: 'fitted',
	};

	const topBar = chalk.dim(`╭${'─'.repeat(76)}╮`);
	const bottomBar = chalk.dim(`╰${'─'.repeat(76)}╯`);
	const emptyBar = chalk.dim(`│${' '.repeat(76)}│`);
	const midBar = chalk.dim(`├${'─'.repeat(76)}┤`);

	// eslint-disable-next-line max-len
	const processFiglet = (input) => input.split("\n").filter((line) => line.trim().length > 0).map((line) => `${chalk.dim('│')}  ${line.trim().padEnd(74, ' ')}${chalk.dim('│')}`).join("\n");
	const processRedFiglet = (input) => input.map((line) => `${chalk.dim('│')}  ${chalk.redBright(line.padEnd(74, ' '))}${chalk.dim('│')}`).join("\n");
	const processLine = (input) => `${chalk.dim('│')}  ${input.trim().padEnd(74, ' ')}${chalk.dim('│')}`;

	const infinumLogoRaw = ["  ███████  ███████", "██       ██       ██", "██       ██       ██", "  ███████  ███████"];

	const infinumLogo = processRedFiglet(infinumLogoRaw);
	const esText = processFiglet(figlet.textSync('Eightshift', figletOpts));
	const devKitText = processFiglet(figlet.textSync('DevKit', figletOpts));

	// eslint-disable-next-line max-len
	console.log([topBar, emptyBar, infinumLogo, emptyBar, esText, emptyBar, devKitText, emptyBar, midBar, emptyBar, processLine('Thank you for using Eightshift DevKit!'), emptyBar, bottomBar, ''].join("\n"));
	console.log('inDEV');
};

module.exports = {
	promptFor,
	installStep,
	promptData,
	clearConsole,
	writeIntro,
};
