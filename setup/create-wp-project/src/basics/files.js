const replace = require('replace-in-file');
const path = require('path');
const { readdir, rename } = require('fs-extra');

const fullPath = path.join(process.cwd());

/**
 * Checks and returns required directory path.
 *
 * @param {string} requiredFolder Folder where installation must occur.
 */
const installPath = async (requiredFolder = 'themes') => {
  const currentPath = path.join(process.cwd());
  const currentDirName = path.basename(currentPath);

  if (currentDirName === requiredFolder) {
    return currentPath;
  }

  const requiredPath = (currentDirName === 'wp-content') ?
    `${currentPath}/${requiredFolder}` :
    `${currentPath}/wp-content/${requiredFolder}`;

  return requiredPath;
};

/**
 * Performs a wide search & replace.
 *
 * @param {string} pathToFolder
 * @param {string} findString
 * @param {string} replaceString
 */
const findReplace = async (pathToFolder, findString, replaceString) => {
  const regex = new RegExp(findString, 'g');
  const options = {
    files: `${pathToFolder}/**/*`,
    from: regex,
    to: replaceString,
    ignore: [
      path.join(`${pathToFolder}/node_modules/**/*`),
      path.join(`${pathToFolder}/.git/**/*`),
      path.join(`${pathToFolder}/.github/**/*`),
      path.join(`${pathToFolder}/vendor/**/*`),
      path.join(`${pathToFolder}/packages/**/*`),
      path.join(`${pathToFolder}/bin/*.js`),
      path.join(`${pathToFolder}/bin/setup/*`),
    ],
  };

  if (findString !== replaceString) {
    await replace(options);
  }
};

/**
 * Async implementation of reading a directory.
 *
 * @param {string} dirPath
 */
const readdirAsync = async (dirPath) => new Promise((resolve, reject) => {
  readdir(dirPath, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

module.exports = {
  fullPath,
  findReplace,
  installPath,
  readdirAsync,
  rename,
};
