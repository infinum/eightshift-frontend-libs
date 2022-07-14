
const { exec } = require('promisify-child-process');

// Required because 'npm run build' sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const cloneTimeout = 45000;

const checkNodeVersion = async () => exec(`node -v`);
const checkComposerVersion = async () => exec(`composer -v`);
const checkWPCliVersion = async () => exec(`wp --info`);
const checkGitVersion = async () => exec(`git --version`);

const checkRequirements = async () => {
  const nodeVersion = await checkNodeVersion();
  if (nodeVersion.stderr !== '') process.exit(0);
  
  const composerVersion = await checkComposerVersion();
  if (composerVersion.stderr !== '') process.exit(0);
  
  const wpCliVersion = await checkWPCliVersion();
  if (wpCliVersion.stderr !== '') process.exit(0);
  
  const gitVersion = await checkGitVersion();
  if (gitVersion.stderr !== '') process.exit(0);
  
  return true;
};

const cloneRepoTo = async (repo, folderName, branch = '') => {
  const repoCommand = branch.length ? `-b ${branch} ${repo}` : repo;
  const command = `git clone ${repoCommand} "${folderName}"`;
  return exec(command, { timeout: cloneTimeout });
};
const installNodeDependencies = async (projectPath) => exec(`cd "${projectPath}" && npm install`);
const installNodePackage = async (projectPath, packageToInstall) => exec(`cd "${projectPath}" && npm install ${packageToInstall}`);
const installComposerDependencies = async (projectPath) => exec(`cd "${projectPath}" && composer install --ignore-platform-reqs`);
const installComposerPackage = async (projectPath, packageToInstall) => exec(`cd "${projectPath}" && composer require ${packageToInstall} --ignore-platform-reqs`);
const wpCoreDownload = async (projectPath) => exec(`cd "${projectPath}" && wp core download`);

module.exports = {
  cloneRepoTo,
  checkRequirements,
  checkNodeVersion,
  checkComposerVersion,
  checkWPCliVersion,
  checkGitVersion,
  installNodeDependencies,
  installNodePackage,
  installComposerDependencies,
  installComposerPackage,
  wpCoreDownload,
};
