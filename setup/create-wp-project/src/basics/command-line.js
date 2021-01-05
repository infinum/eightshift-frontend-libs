
const { exec } = require('promisify-child-process');

// Required because 'npm run build' sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const cloneTimeout = 45000;

const cloneRepoTo = async (repo, folderName, branch = '') => {
  const repoCommand = branch.length ? `-b ${branch} ${repo}` : repo;
  const command = `git clone ${repoCommand} "${folderName}"`;
  return exec(command, { timeout: cloneTimeout });
};
const installNodeDependencies = async (projectPath) => exec(`cd "${projectPath}" && npm install`);
const installNodePackage = async (projectPath, packageToInstall) => exec(`cd "${projectPath}" && npm install ${packageToInstall}`);
const installComposerDependencies = async (projectPath) => exec(`cd "${projectPath}" && composer install --ignore-platform-reqs`);
const wpCoreDownload = async (projectPath) => exec(`cd "${projectPath}" && wp core download`);

module.exports = {
  cloneRepoTo,
  installNodeDependencies,
  installNodePackage,
  installComposerDependencies,
  wpCoreDownload,
};
