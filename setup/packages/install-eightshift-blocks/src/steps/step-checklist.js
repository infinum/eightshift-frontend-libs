const {
  files: { fullPath, readdirAsync },
  misc: { variable },
  variables: {
    eightshiftLibsModuleName,
    eightshiftBlocksModuleName,
    eightshiftBlocksPath
  },
} = require('eightshift-scripts');

const { exec } = require('promisify-child-process');

/**
 * Make sure everything is in order.
 *
 * 1. Make sure we're in folder containing `package.json`
 * 2. Make sure that `package.json` has `eightshift-blocks` as dependency
 * 3. Make sure it's installed in vendors folder and that the `examples` folder exists
 */
const preflightChecklist = async () => {

  // 1. Make sure we're in folder containing `package.json`
  await verifyComposerJson(fullPath);

  // 2. Make sure that `package.json` has `eightshift-libs` as dependency
  await checkIfModuleInstalled(eightshiftLibsModuleName);

  // 3. Make sure that `package.json` has `eightshift-blocks` as dependency
  // await checkIfModuleInstalled(eightshiftBlocksModuleName)

  // 4. Make sure it's installed in vendors folder and that the `examples` folder exists
  // await checkIfExampleFolderExists(eightshiftBlocksModuleName);

  return true;
}

/**
 * Make sure we're in folder containing `package.json`
 */
const verifyComposerJson = async (fullPath) => {
  const filesInDir = await readdirAsync(fullPath);
  if (!filesInDir.find((file) => file === 'composer.json')) {
    throw new Error(`Unable to find ${variable('composer.json')} in current folder, this script must be run from your project's folder.`);
  }
  return true;
}

/**
 * Test if `moduleName` is installed in `node_modules`.
 *
 * @param {string} moduleName Name of the module we're looking for.
 */
const checkIfModuleInstalled = async (moduleName) => {
  try {
    await exec(`composer show ${moduleName}`);
  } catch (e) {
    throw new Error(`Composer package ${variable(moduleName)} not found. Please make sure it is listed as a dependency in ${variable('composer.json')} and installed .`);
  }
  return true;
}

/**
 * Make sure `examples` folder exists in `eightshift-libs`
 */
const checkIfExampleFolderExists = async (moduleName) => {
  const files = await readdirAsync(eightshiftBlocksPath);
  if (!filesInDir.find((file) => file === 'examples')) {
    throw new Error(`Unable to find blocks to extend in ${eightshiftBlocksModuleName} vendor package (${eightshiftBlocksPath}), please contact the lib support.`);
  }
  return true;
}

module.exports = {
  preflightChecklist,
  verifyComposerJson,
  checkIfModuleInstalled,
  checkIfExampleFolderExists,
};