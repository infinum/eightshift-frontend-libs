#!/usr/bin/env node
const path = require('path');

const {
	console: {
		clearConsole,
		installStep,
		writeIntro,
	},
	argumentOperations: { maybePrompt },
	commandLine: {
		cloneRepoTo,
		checkRequirements,
		installNodeDependencies,
		installComposerDependencies,
		wpThemeActivate,
		boilerplateThemeInit,
		initReusableHeaderFooter,
	},
	files: { installPath },
	misc: { log },
} = require('../basics');
const { searchReplace } = require('../search-replace');
const { replaceVersionNumbers } = require('../replace-version-numbers');
const { cleanup } = require('../cleanup');
const { scriptArguments } = require('../arguments');
const { installModifiedNodeDependencies, installModifiedComposerDependencies } = require('../dependencies');
const { alertBox } = require('../basics/misc');
const chalk = require('chalk');

exports.command = ['*', 'theme'];
exports.desc = 'Setup a new WordPress theme. Should be run inside your theme folder (wp-content/themes).';
exports.builder = scriptArguments;

exports.handler = async (argv) => {
	await clearConsole();
	await writeIntro();

	// Trigger prompts if any of the required arguments was not set
	const promptedInfo = await maybePrompt(scriptArguments, argv);

	log('');

	alertBox("Sit back and relax!\n", 'Setting up theme', 'success', { omitLastLine: true });

	// Check if you are in the required folder
	const requiredPath = await installPath('themes');
	const projectPath = path.join(requiredPath, promptedInfo.package);
	const boilerplateRepoUrl = argv.eightshiftBoilerplateRepo ?? 'https://github.com/infinum/eightshift-boilerplate.git';
	const boilerplateRepoBranch = argv.eightshiftBoilerplateBranch ?? '';

	// Check if all requirements are installed
	await installStep({
		describe: `Getting ready`,
		thisHappens: checkRequirements(),
	});

	// Clone repo from git with given arguments
	await installStep({
		describe: `Cloning the repository`,
		thisHappens: cloneRepoTo(boilerplateRepoUrl, projectPath, boilerplateRepoBranch),
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

	// Replace default theme information with the prompted information
	await installStep({
		describe: `Replacing theme info`,
		thisHappens: searchReplace(promptedInfo, projectPath),
	});

	// Install all composer packages as is or overwrite libs
	if (argv.eightshiftLibsBranch) {
		await installStep({
			describe: `Installing Composer packages`,
			thisHappens: installModifiedComposerDependencies(projectPath, argv.eightshiftLibsBranch, argv.eightshiftLibsRepo),
		});
	} else {
		await installStep({
			describe: `Installing Composer packages`,
			thisHappens: installComposerDependencies(projectPath),
		});
	}

	// Remove unused cloned folders and files
	await installStep({
		describe: `Cleaning up`,
		thisHappens: cleanup(projectPath),
	});

	// Reset version numbers to 1.0.0
	await installStep({
		describe: `Replacing version numbers`,
		thisHappens: replaceVersionNumbers(projectPath, promptedInfo.projectName),
	});

	// Activate theme.
	await installStep({
		describe: `Activating theme`,
		thisHappens: wpThemeActivate(promptedInfo.package),
	});

	// Initialize theme.
	await installStep({
		describe: `Initializing theme`,
		thisHappens: boilerplateThemeInit(promptedInfo.package),
	});

	// Initialize reusable header/footer.
	await installStep({
		describe: `Setting up header and footer`,
		thisHappens: initReusableHeaderFooter(),
	});

	// Show success message and exit successfully.
	alertBox([
		'',
		'Theme has been set up, activated and is ready to use.',
		'',
		`Check the documentation at ${chalk.underline('eightshift.com')} if you want to learn more, have any questions, or run into any issues.`,
		'',
		'Have fun!',
	].join("\n"), "\n...done!", 'success', { omitFirstLine: true });

	process.exit(0);
};
