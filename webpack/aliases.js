/**
 * Project Aliases used for getting all the correct paths.
 *
 * @since 2.0.0
 */

const path = require('path');

module.exports = (packagesPath) => {
  return {
    resolve: {
      alias: {

        // Alias this package for use when we're working on Storybook
        // With this you can always import things from index.js using:
        // import { something } from '@eightshift/frontend-libs';
        '@eightshift/frontend-libs': path.resolve(packagesPath.libsPath),
      },
    },
  };
};
