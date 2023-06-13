const chalk = require('chalk');

const log = (msg) => console.log(msg);
const error = (msg) => log(`${chalk.bgRed('Error')}${chalk.red(' - ')}${msg}`);
const label = (msg) => chalk.green(msg);
const variable = (msg) => chalk.cyan(msg);

const alertBox = (msg, title, type = 'info', config = {}) => {
	let autoTitle = '';

	const colorText = (input, bold = false) => {
		if (type === 'error') {
			autoTitle = 'Something went wrong';
			return bold ? chalk.red.bold(input) : chalk.red(input);
		} else if (type === 'success') {
			autoTitle = 'Success';
			return bold ? chalk.green.bold(input) : chalk.green(input);
		}

		autoTitle = 'Info';
		return bold ? chalk.blue.bold(input) : chalk.blue(input);
	};

	const omitFirstLine = config?.omitFirstLine ?? false;
	const omitLastLine = config?.omitLastLine ?? false;

	const formattedMsg = msg.split("\n").map((line) => `${colorText('│')}${chalk.reset()} ${line.trim().replace("\n", '')}`);
	const formattedTitle = (title ?? autoTitle).length > 0 ? (title ?? autoTitle).split("\n").map((line) => `${colorText('│')}${chalk.reset()} ${colorText(line.trim().replace("\n", ''), true)}`) : [];

	const alertBody = [
		...formattedTitle,
		...formattedMsg,
	];

	if (omitFirstLine && !omitLastLine) {
		console.log([...alertBody, colorText('╰')].join("\n"));
	} else if (!omitFirstLine && omitLastLine) {
		console.log([colorText('╭'), ...alertBody].join("\n"));
	} else if (omitFirstLine && omitLastLine) {
		console.log(alertBody.join("\n"));
	} else {
		console.log([colorText('╭'), ...alertBody, colorText('╰')].join("\n"));
	}
};

const capCase = (string) => string.toLowerCase().replace(/\W+/g, '_').split('_').map((item) => item[0].toUpperCase() + item.slice(1)).join('_');

module.exports = {
	log,
	error,
	variable,
	label,
	capCase,
	alertBox,
};
