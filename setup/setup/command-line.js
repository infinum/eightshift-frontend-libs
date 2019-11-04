
const { exec } = require('promisify-child-process');

// Required because 'npm run build' sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const maxBuffer = 500 * 1024;

const cloneRepoTo = async (repo, folderName) => {
  const command = `git clone ${repo} ${folderName}`;
  return exec(command);
};
const installNodeDependencies = async () => exec('npm install');
const installComposerDependencies = async () => exec('composer install --ignore-platform-reqs');
const updateComposerAutoloader = async () => exec('composer -o dump-autoload');
const buildAssets = async () => exec('npm run build', { maxBuffer });
const wpCoreDownload = async () => exec('wp core download');

module.exports = {
  cloneRepoTo,
  installNodeDependencies,
  installComposerDependencies,
  updateComposerAutoloader,
  buildAssets,
  wpCoreDownload,
};
