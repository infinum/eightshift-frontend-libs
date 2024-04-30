const { installNodePackage, installComposerPackage } = require('./basics/command-line');

const eightshiftLibsName = '';
const defaultEightshiftLibsRepo = 'infinum/eightshift-libs';
const eightshiftFrontendLibsRepo = 'infinum/eightshift-frontend-libs';
const eightshiftFrontendLibsRepoUrl = 'https://github.com/infinum/eightshift-frontend-libs';

/**
 * Check if we need to modify dependencies (if user passed an alternative branch or repo for any dependency
 * as argument)
 *
 * @param {object} argv List of CLI arguments.
 */
const areDependenciesModified = (argv) => {
  return argv.eightshiftLibsBranch || argv.eightshiftFrontendLibsBranch || argv.eightshiftLibsRepo;
};

/**
 * Installs node packages and modifies the frontendLibs to a specific branch.
 *
 * @param {string} projectPath Path to the project.
 * @param {array} branch Name of the branch to pull from.
 */
const installModifiedNodeDependencies = async (projectPath, branch) => {
  return installNodePackage(projectPath, `${eightshiftFrontendLibsRepoUrl}#${branch} --save`);
};

/**
 * Installs composer packages and modifies the libs to a specific branch or repo.
 *
 * @param {string} projectPath Path to the project.
 * @param {array} branch Name of the branch to pull from.
 * @param {string} repo Custom repository to use if provided.
 */
const installModifiedComposerDependencies = async (projectPath, branch, repo) => {
  const eightshiftLibsRepo = repo || defaultEightshiftLibsRepo;
  return installComposerPackage(projectPath, `${eightshiftLibsRepo}:dev-${branch}`);
};

module.exports = {
  eightshiftLibsName,
  eightshiftFrontendLibsRepo,
  areDependenciesModified,
  installModifiedNodeDependencies,
  installModifiedComposerDependencies,
};
