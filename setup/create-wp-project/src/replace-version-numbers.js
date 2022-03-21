
const replace = require('replace-in-file');
const path = require('path');
const fs = require('fs-extra');

const replaceVersionNumbers = async(projectPath) => {
  const pathStyleCss = path.join(projectPath, 'style.css');

  // style.css
  if (await fs.pathExists(pathStyleCss)) {
    await replace({
      files: pathStyleCss,
      from: /^Version: .*$/m,
      to: 'Version: 1.0.0',
    });
  }

};

module.exports = {
  replaceVersionNumbers,
};
