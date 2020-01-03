/**
 * Unit tests for files.js
 *
 * @group unit
 */
const del = require('del');
const path = require('path');
const {
  existsSync,
  writeFileSync,
  readFile,
  mkdirSync,
} = require('fs');
const { fullPath, findReplace, readdirAsync } = require('../../../src/basics/files.js');
const { promisify } = require('util');

const testFiles = {
  dir: path.join(`${fullPath}/jestTestDir`),
  dirEmpty: path.join(`${fullPath}/jestTestDirEmpty`),
  file: path.join(`${fullPath}/jestTestDir/test.json`),
  file2: path.join(`${fullPath}/jestTestDir/test2.json`),
  ignoredDir: path.join(`${fullPath}/jestTestDir/node_modules`),
  ignoredDirFile: path.join(`${fullPath}/jestTestDir/node_modules/test.json`),
};

beforeEach(() => {
  const testData = {
    name: 'This is a test string.',
  };

  if (!existsSync(testFiles.dir)) {
    mkdirSync(testFiles.dir);
  }

  if (!existsSync(testFiles.dirEmpty)) {
    mkdirSync(testFiles.dirEmpty);
  }

  if (!existsSync(testFiles.ignoredDir)) {
    mkdirSync(testFiles.ignoredDir);
  }

  writeFileSync(testFiles.file, JSON.stringify(testData));
  writeFileSync(testFiles.file2, JSON.stringify(testData));
  writeFileSync(testFiles.ignoredDirFile, JSON.stringify(testData));
});

afterEach(async () => {
  await del(testFiles.dir);
  await del(testFiles.dirEmpty);
});


// Test readdirAsync
test('Make sure we got the correct number of files back', async () => {
  const files = await readdirAsync(testFiles.dir);
  expect(files.length === 3 && files.some((file) => file === 'test.json')).toBe(true);
});

test('Make sure we receive nothing from empty directory', async () => {
  const files = await readdirAsync(testFiles.dirEmpty);
  expect(files.length).toBe(0);
});

// Test findReplace
test('Make sure find & replace replaced the search string', async () => {
  await findReplace(testFiles.dir, 'test string', 'hello world');
  const readFileAsync = promisify(readFile);
  const fileContents = JSON.parse(await readFileAsync(testFiles.file, 'utf-8'));
  expect(fileContents.name).not.toMatch('This is a test string.');
});

test('Make sure find & replace inserted the new string', async () => {
  await findReplace(testFiles.dir, 'test string', 'hello world');
  const readFileAsync = promisify(readFile);
  const fileContents = JSON.parse(await readFileAsync(testFiles.file, 'utf-8'));
  expect(fileContents.name).toMatch('hello world');
});

test('Make sure find & replace is working in multiple files', async () => {
  await findReplace(testFiles.dir, 'test string', 'hello world');
  const readFileAsync = promisify(readFile);
  const fileContents = JSON.parse(await readFileAsync(testFiles.file2, 'utf-8'));
  expect(fileContents.name).toMatch('hello world');
});

test('Make sure find & replace didn\'t do anything in an ignored folder', async () => {
  await findReplace(testFiles.dir, 'test string', 'hello world');
  const readFileAsync = promisify(readFile);
  const fileContents = JSON.parse(await readFileAsync(testFiles.ignoredDirFile, 'utf-8'));
  expect(fileContents.name).not.toMatch('hello world');
});
