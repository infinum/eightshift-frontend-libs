
const { exec } = require('promisify-child-process');

// Required because 'npm run build' sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const cloneTimeout = 45000;

// Check Node.js version
const checkNodeVersion = async () => exec(`node -v`);
// Check Composer version
const checkComposerVersion = async () => exec(`composer -v`);
// Check WP-Cli version
const checkWPCliVersion = async () => exec(`wp --info`);
// Check Git version
const checkGitVersion = async () => exec(`git --version`);

// Go trough every requirement and check for errors. If there are any errors script will fail
const checkRequirements = async () => {
  const nodeVersion = await checkNodeVersion();
  if (nodeVersion.stderr !== '') process.exit(1);
  
  const composerVersion = await checkComposerVersion();
  if (composerVersion.stderr !== '') process.exit(1);
  
  const wpCliVersion = await checkWPCliVersion();
  if (wpCliVersion.stderr !== '') process.exit(1);
  
  const gitVersion = await checkGitVersion();
  if (gitVersion.stderr !== '') process.exit(1);
  
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
