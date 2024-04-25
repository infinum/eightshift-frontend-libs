#!/usr/bin/env node
const path = require('path');

const {
	console: {
		clearConsole,
		installStep,
		writeIntro,
	},
	argumentOperations: {
		maybePrompt,
	},
	commandLine: {
		cloneRepoTo,
		installNodeDependencies,
		installComposerDependencies,
	},
	files: { installPath },
	misc: { log },
} = require('../basics');
const { searchReplace } = require('../search-replace');
const { cleanup } = require('../cleanup');
const { scriptArguments } = require('../arguments');
const { installModifiedComposerDependencies, installModifiedNodeDependencies } = require('../dependencies');
const { alertBox } = require('../basics/misc');
const chalk = require('chalk');
const { navigateToDirectory } = require('../navigate-to-directory');

exports.command = 'plugin';
exports.desc = 'Setup a new WordPress plugin. Should be run inside your plugins folder (wp-content/plugins).';
exports.builder = scriptArguments;

exports.handler = async (argv) => {
	await clearConsole();
	await writeIntro();

	const promptedInfo = await maybePrompt(scriptArguments, argv);
	const requiredPath = await installPath('plugins');
	const projectPath = path.join(requiredPath, promptedInfo.package);

	// Navigate to the plugins directory
	navigateToDirectory('plugins');

	log('');

	alertBox("Sit back and relax!\n", 'Setting up your plugin', 'success', { omitLastLine: true });

	await installStep({
		describe: `Cloning the repository`,
		// eslint-disable-next-line max-len
		thisHappens: cloneRepoTo('https://github.com/infinum/eightshift-boilerplate-plugin', projectPath, argv.eightshiftBoilerplateBranch ? argv.eightshiftBoilerplateBranch : ''),
	});

	// Install all node packages as is or overwrite frontend-libs
	if (argv.eightshiftFrontendLibsBranch) {
		await installStep({
			describe: `Installing Node packages`,
			thisHappens: installModifiedNodeDependencies(projectPath, argv.eightshiftFrontendLibsBranch),
		});
	} else {
		await installStep({
			describe: `Installing Node packages`,
			thisHappens: installNodeDependencies(projectPath),
		});
	}

	await installStep({
		describe: `Replacing info`,
		thisHappens: searchReplace(promptedInfo, projectPath),
	});

	// Install all composer packages as is or overwrite libs
	if (argv.eightshiftLibsBranch) {
		await installStep({
			describe: `Installing Composer packages`,
			thisHappens: installModifiedComposerDependencies(projectPath, argv.eightshiftLibsBranch),
		});
	} else {
		await installStep({
			describe: `Installing Composer packages`,
			thisHappens: installComposerDependencies(projectPath),
		});
	}

	await installStep({
		describe: `Cleaning up`,
		thisHappens: cleanup(projectPath),
	});

	alertBox([
		'',
		chalk.bold('Next steps'),
		'- Activate the plugin',
		chalk.gray(`  ${chalk.underline(`wp plugin activate ${promptedInfo.package}`)}`),
		'- Initialize the plugin',
		chalk.gray(`  ${chalk.underline(`cd ${promptedInfo.package}`)}, then ${chalk.underline('wp boilerplate init plugin')}`),
		'',
		`Check the documentation at ${chalk.underline('eightshift.com')} if you want to learn more, have any questions, or run into any issues.`,
		`You can also run ${chalk.gray.underline('wp boilerplate --help')} to see what's possible using our WP CLI commands.`,
		'',
		'Have fun!',
	].join("\n"), "\n...done!", 'success', { omitFirstLine: true });

	process.exit(0);
};
