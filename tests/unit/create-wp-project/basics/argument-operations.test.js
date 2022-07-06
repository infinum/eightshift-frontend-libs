/**
 * Unit tests for argument-operations.js
 *
 * @group unit
 */

import inquirer from 'inquirer';
import { log } from '../../../../setup/create-wp-project/src/basics/misc';

jest.mock('inquirer');

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

test('Project name will not pass if it matches forrbiden keyword.', async () => {
	expect.assertions(eightshiftForbiddenKeywords.length);

	eightshiftForbiddenKeywords.forEach((word) => {
		expect(checkProjectName(word)).toBe(word);
	});
});

test('Project name will pass if it does not match any of forrbiden keywords.', async () => {
	expect(checkProjectName('TestTheme')).toBeUndefined();
});

test('Prompt will succeed if .', async () => {
	expect(maybePrompt(scriptArguments, testArgsSuccess)).toBe({
		projectName: 'TestTheme',
		url: 'dev-url.test',
		description: 'Test description',
		noSummary: true,
	});
});

test('Test maybe prompt fail.', async () => {
	expect(maybePrompt(scriptArguments, testArgsSuccess)).not.toBeNull();
});
