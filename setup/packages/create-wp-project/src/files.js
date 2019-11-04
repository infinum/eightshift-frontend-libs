const del = require('del'); // eslint-disable-line
const { join } = require('path');
const { copy, pathExists } = require('fs-extra');

const deleteUnneeded = async (folderPath) => {
  await del(join(folderPath, '.git'));
  await del(join(folderPath, '.github'));
  await del(join(folderPath, '.gitattributes'));
};

const copyMandatory = async (sourcePath, targetPath) => {
  const filename = '.gitignore';
  const fileSource = join(sourcePath, filename);
  const fileTarget = join(targetPath, filename);

  if (await pathExists(fileSource)) {
    await copy(fileSource, fileTarget);
  }
};

const copyAll = async (sourcePath, targetPath) => {
  await deleteUnneeded(sourcePath);

  // Copy all files without overwriting
  await copy(sourcePath, targetPath, {
    overwrite: false,
  });

  await copyMandatory(sourcePath, targetPath);
};

module.exports = {
  copyAll,
};
