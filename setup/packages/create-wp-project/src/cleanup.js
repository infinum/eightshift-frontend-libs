const del = require('del'); // eslint-disable-line

const cleanup = async (tempPath) => {
  // Delete cloned folder.
  await del(tempPath);
};

module.exports = {
  cleanup,
};
