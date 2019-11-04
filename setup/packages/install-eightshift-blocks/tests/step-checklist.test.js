const { writeFile, unlinkSync, unlink } = require('fs');
const { exec } = require('promisify-child-process');
const del = require('del');
const {
  files: { fullPath },
  variables: { eightshiftLibsModuleName },
} = require('eightshift-scripts');

const {
  composerTimeout,
  setupComposer,
  tearDownComposer
} = require('./bootstrap.js');

const {
  preflightChecklist,
  verifyComposerJson,
  checkIfModuleInstalled,
  checkIfExampleFolderExists,
} = require('../src/steps/step-checklist');

// -----------------------------------
// verifyComposerJson
// -----------------------------------
describe('When composer.json exists...', () => {

  // Applies only to tests in this describe block
  beforeEach(() => {
    writeFile('composer.json', '{}', (err) => {
      if (err) throw err;
    });
  });

  test('Should confirm composer.json exists in folder', async () => {
    const response = await verifyComposerJson(fullPath);
    expect(response).toBe(true);
  });
});

describe('When composer.json DOESN\'t exist...', () => {

  // Applies only to tests in this describe block
  beforeEach(() => {
    unlinkSync('composer.json', (err) => {
      if (err) throw err;
    });
  });

  test('Should confirm composer.json doesnt exists in folder', async () => {
    await expect(verifyComposerJson(fullPath)).rejects.toThrow(Error);
  });
});

// -----------------------------------
// checkIfModuleInstalled
// -----------------------------------

describe('When specific module is installed...', () => {

  // Setup composer.json and install
  beforeEach( async() => {
    await setupComposer(eightshiftLibsModuleName);
  }, composerTimeout);

  // Remove composer stuff
  afterEach( async() => {
    await tearDownComposer(eightshiftLibsModuleName);
  }, composerTimeout);

  test('Should check if eightshift-libs module is installed', async () => {
    const response = await checkIfModuleInstalled(eightshiftLibsModuleName);
    expect(response).toBe(true);
  });
});

describe('When specific module IS NOT installed...', () => {
  test('Should confirm eightshift-libs module isn\'t installed', async () => {
    await expect(checkIfModuleInstalled(eightshiftLibsModuleName)).rejects.toThrow(Error);
  });
});

// -----------------------------------
// checkIfExampleFolderExists
// -----------------------------------

const eightshiftBlocksModule = 'infinum/eightshift-blocks';
describe('When examples folder exist...', () => {
  // beforeEach( async() => {
  //   await setupComposer(eightshiftBlocksModule);
  // }, composerTimeout);

  // afterEach( async() => {
  //   await tearDownComposer(eightshiftBlocksModule);
  // }, composerTimeout);

  // test('Should confirm examples folder exists', async () => {
  //   const response = await checkIfExampleFolderExists(eightshiftBlocksModule);
  //   expect(response).toBe(true);
  // });
});

describe('When examples folder DOES NOT exist...', () => {
  beforeEach( async() => {
    await setupComposer(eightshiftBlocksModule);
    await del([`vendor/${eightshiftBlocksModule}/examples`]);
  }, composerTimeout);

  afterEach( async() => {
    await tearDownComposer(eightshiftBlocksModule);
  }, composerTimeout);

  test('Should confirm examples folder doesn\'t exist', async () => {
    await expect(checkIfExampleFolderExists(eightshiftBlocksModule)).rejects.toThrow(Error);
  });
});

