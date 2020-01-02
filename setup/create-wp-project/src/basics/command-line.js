
const { exec } = require('promisify-child-process');

// Required because 'npm run build' sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const maxBuffer = 500 * 1024;
const cloneTimeout = 45000;

const cloneRepoTo = async (repo, folderName) => {
  const command = `git clone ${repo} ${folderName}`;
  return exec(command, { timeout: cloneTimeout });
};
const installNodeDependencies = async (projectPath) => exec(`cd ${projectPath} && npm install`);
const installComposerDependencies = async (projectPath) => exec(`cd ${projectPath} && composer install --ignore-platform-reqs`);
const updateComposerAutoloader = async (projectPath) => exec(`cd ${projectPath} && composer -o dump-autoload`);
const buildAssets = async (projectPath) => exec(`cd ${projectPath} && npm run build`, { maxBuffer });
const wpCoreDownload = async (projectPath) => exec(`cd ${projectPath} && wp core download`);

module.exports = {
  cloneRepoTo,
  installNodeDependencies,
  installComposerDependencies,
  updateComposerAutoloader,
  buildAssets,
  wpCoreDownload,
};
