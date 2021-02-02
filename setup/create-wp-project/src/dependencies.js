const { installNodePackage } = require('./basics/command-line');

const eightshiftLibsName = '';
const eightshiftFrontendLibsRepo = 'infinum/eightshift-frontend-libs';

/**
 * Check if we need to modify dependencies (if user passed an alternative branch for any dependency
 * as argument)
 *
 * @param {object} argv List of CLI arguments.
 */
const areDependenciesModified = (argv) => {
  return argv.eightshiftLibsBranch || argv.eightshiftFrontendLibsBranch;
};

/**
 * Installs node packages and modifies the frontendLibs to a specific branch.
 *
 * @param {string} projectPath Path to the project.
 * @param {array} branch Name of the branch to pull from.
 */
const installModifiedNodeDependencies = async (projectPath, branch) => {
  return installNodePackage(projectPath, `${eightshiftFrontendLibsRepo}#${branch} --save`);

};

module.exports = {
  eightshiftLibsName,
  eightshiftFrontendLibsRepo,
  areDependenciesModified,
  installModifiedNodeDependencies,
};
