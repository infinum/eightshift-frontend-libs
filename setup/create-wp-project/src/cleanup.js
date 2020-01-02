const del = require('del'); // eslint-disable-line
const { join } = require('path');

const cleanup = async(projectPath) => {

  // Delete cloned folder.
  await del(join(projectPath, '.git'));
  await del(join(projectPath, '.github'));
  await del(join(projectPath, '.gitattributes'));
};

module.exports = {
  cleanup,
};
