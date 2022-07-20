
const replace = require('replace-in-file');
const path = require('path');
const fs = require('fs-extra');

const replaceVersionNumbers = async (projectPath, themeName) => {
	const styleCssPath = path.join(projectPath, 'style.css');
	const functionsPhpPath = path.join(projectPath, 'functions.php');
	const packageLockPath = path.join(projectPath, 'package-lock.json');
	const packageJsonPath = path.join(projectPath, 'package.json');
	const changelogPath = path.join(projectPath, 'CHANGELOG.md');

	// style.css
	if (await fs.pathExists(styleCssPath)) {
		await replace({
			files: styleCssPath,
			from: /^Version: .*$/m,
			to:    'Version: 1.0.0',
		});
	}

	// functions.php
	if (await fs.pathExists(functionsPhpPath)) {
		await replace({
			files: functionsPhpPath,
			from: /^ \* Version: .*$/m,
			to: ' * Version: 1.0.0',
		});
	}

	// package-lock.json
	if (await fs.pathExists(packageLockPath)) {
		await replace({
			files: packageLockPath,
			from: /^\t"version": ".*",$/m,
			to: `\t"version": "1.0.0",\n`,
		});
	}

	// package.json
	if (await fs.pathExists(packageJsonPath)) {
		await replace({
			files: packageJsonPath,
			from: /^\t"version": ".*",$/m,
			to: `\t"version": "1.0.0",\n`,
		});
	}

	// CHANGELOG.md
	if (await fs.pathExists(changelogPath)) {
		const newChangelog = [
			`# Changelog for the ${themeName}`,
			'All notable changes to this project will be documented in this file.\n',
			'This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).\n',
			'## [Unreleased] - TBD\n',
			'### Added\n',
			'### Changed\n',
			'### Deprecated\n',
			'### Removed\n',
			'### Fixed\n',
			'## [1.0.0] - <setup-date>\n',
			'Initial tagged release.\n',
			'[Unreleased]: https://github.com/infinum/eightshift-boilerplate/compare/master...HEAD\n\n',
			'[1.0.0]: https://github.com/infinum/eightshift-boilerplate/compare/INIT_COMMIT...1.0.0`',
		].join('\n');

		await fs.writeFile(changelogPath, newChangelog, 'utf-8');
	}
};

module.exports = {
	replaceVersionNumbers,
};
