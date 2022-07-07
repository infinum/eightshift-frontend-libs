/**
 * Unit tests for argument-operations.js
 *
 * @group unit
 */


const { scriptArguments } = require('../../../../setup/create-wp-project/src/arguments');

const {
	maybePrompt,
	projectNameValidator,
} = require('../../../../setup/create-wp-project/src/basics/argument-operations');

const testArguments = {
	projectName: 'TestTheme',
	url: 'dev-url.test',
	description: 'Test description',
	noSummary: true,
};

describe('Create wp project prompts will pass', () => {
	test('Project name validator will succeed if none of forbidden keywords is used.', async () => {
		expect(projectNameValidator('Test Theme')).toBe(true);
		expect(projectNameValidator('Test Theme')).not.toBe(false);
	});
	
	test('Project name validator will fail if any of forbidden keywords is used.', async () => {
		expect(projectNameValidator('final')).toBe(false);
		expect(projectNameValidator('final')).not.toBe(true);
	});
	
	test('Url argument will be the same as entered.', async () => {
		const data = await maybePrompt(scriptArguments, testArguments);
	
		expect(data.url).toBe(testArguments.url);
		expect(data.url).not.toBeUndefined();
	});
	
	test('Description argument will be the same as entered.', async () => {
		const data = await maybePrompt(scriptArguments, testArguments);
	
		expect(data.description).toBe(testArguments.description);
		expect(data.description).not.toBeUndefined();
	});
	
	test('Undefined arguments will be skipped entirely.', async () => {
		const newArguments = {
			testProp: 'Some text',
			...testArguments,
		};
		const data = await maybePrompt(scriptArguments, newArguments);
	
		expect(data.testProp).toBeUndefined();
		expect(data.testProp).not.toBeTruthy();
	});
	
	test('Arguments with "skipPrompt" will skip prompt and won\'t be shown in answers.', async () => {
		const newArguments = {
			eightshiftBoilerplateRepo: 'eightshiftBoilerplateRepo',
			...testArguments,
		};

		const data = await maybePrompt(scriptArguments, newArguments);

		expect(data.eightshiftBoilerplateRepo).toBeUndefined();
		expect(data.eightshiftBoilerplateRepo).not.toBeTruthy();
	});
	
	test('Argument package will build correctly.', async () => {
		const data = await maybePrompt(scriptArguments, testArguments);

		expect(data.package).toBe('testtheme');
		expect(data.package).not.toBeUndefined();
	});
	
	test('Argument nameSpace will build correctly.', async () => {
		const data = await maybePrompt(scriptArguments, testArguments);

		expect(data.namespace).toBe('Testtheme');
		expect(data.namespace).not.toBeUndefined();
	});
})

