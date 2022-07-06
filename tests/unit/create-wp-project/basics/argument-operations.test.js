/**
 * Unit tests for argument-operations.js
 *
 * @group unit
 */

import inquirer from 'inquirer';
import { log } from '../../../../setup/create-wp-project/src/basics/misc';

jest.mock('chalk', () => ({
	bgRed: jest.fn(),
	red: jest.fn(),
	blue: jest.fn(),
	green: jest.fn(),
	cyan: jest.fn(),
	yellow: jest.fn(),
}));

const {
	maybePrompt,
} = require('../../../../setup/create-wp-project/src/basics/argument-operations');
const { scriptArguments } = require('../../../../setup/create-wp-project/src/arguments');

const {
	eightshiftForbiddenKeywords,
} = require('../../../../setup/create-wp-project/src/basics/variables');

const checkProjectName = (projectName) => {
	return eightshiftForbiddenKeywords.find((forbiddenWord) => forbiddenWord === projectName);
};

const testArgsSuccess = {
	projectName: 'TestTheme',
	url: 'dev-url.test',
	description: 'Test description',
	noSummary: true,
};

const testArgsFail = {
	projectName: 'final',
	url: 'dev-url.test',
	description: 'Test description',
	noSummary: true,
};

let backup;

test('Project name will not pass if it matches forrbiden keyword.', async () => {
	expect.assertions(eightshiftForbiddenKeywords.length);

	eightshiftForbiddenKeywords.forEach((word) => {
		expect(checkProjectName(word)).toBe(word);
	});
});

test('Project name will pass if it does not match any of forrbiden keywords.', async () => {
	expect(checkProjectName('TestTheme')).toBeUndefined();
});

test('Prompt will succeed with correctly passed arguments.', async () => {
	const output = await maybePrompt(scriptArguments, testArgsSuccess);

	expect(output.projectName).toBe(testArgsSuccess.projectName);
	expect(output.projectName).not.toBe('Boilerplate theme');

});

test('Prompt will fail with forbidden keyword.', async () => {
	backup = inquirer.prompt;
    inquirer.prompt = (questions) => Promise.resolve('My Theme');

	expect(await maybePrompt(scriptArguments, testArgsFail).projectName).toBe('My Theme');
	
	inquirer.prompt = backup;
});
