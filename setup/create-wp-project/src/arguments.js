const scriptArguments = {
  projectName: {
    type: 'text',
    name: 'projectName',
    describe: 'Please enter your project name (e.g. Your Project Name):',
  },
  url: {
    type: 'text',
    name: 'url',
    describe: 'Your dev url (e.g. dev.wordpress.com):',
  },
  description: {
    type: 'text',
    name: 'description',
    describe: 'Your project\'s description:',
  },
  package: {
    type: 'text',
    name: 'package',
    describe: 'Package name: name of the folder, text domain name (e.g. package-name):',
    buildFrom: {
      name: 'projectName',
      how: (sourceArg) => sourceArg.replace(/[^a-z0-9 -]/gi, '').toLowerCase().split(' ').join('-'),
    },
  },
  namespace: {
    type: 'text',
    name: 'namespace',
    describe: 'Namespace for your project / files (e.g. Package_Name):',
    buildFrom: {
      name: 'projectName',
      how: (sourceArg) => sourceArg
        .replace(/[^a-z0-9 _]/gi, '') // leave only digits, letters, spaces and underscores
        .toLowerCase()
        .split(/[ _]+/) // split on space and underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter of each word
        .join('_'),
    },
  },
  prefix: {
    type: 'text',
    name: 'prefix',
    describe: 'Prefix for any globals. (e.g. INF):',
    buildFrom: {
      name: 'projectName',
      how: (sourceArg) => {

        // Build prefix from theme name using one of 2 methods.
        // 1. If theme name has 2 or mor more words, use first letters of each word
        let prefix = '';
        const sourceWords = sourceArg.split(' ');
        if (sourceWords && sourceWords.length >= 2) {
          for (const word of sourceWords) {
            prefix += word.charAt(0).toUpperCase();
          }
        }

        // 2. If theme has only 1 word, use the first 3 letters of theme name
        if (prefix.length < 2 && sourceArg.length > 2) {
          prefix = (`${sourceArg.charAt(0)}${sourceArg.charAt(1)}${sourceArg.charAt(2)}`).toUpperCase();
        }

        return prefix;
      },
    },
  },
  env: {
    type: 'text',
    name: 'env',
    describe: 'Environment variable used for env-specific settings (e.g. INF_ENV):',
    buildFrom: {
      name: 'prefix',
      how: (sourceArg) => `${sourceArg}_ENV`,
    },
  },
  projectPrefix: {
    type: 'text',
    name: 'projectPrefix',
    describe: 'Project prefix (e.g. esh):',
    buildFrom: {
      name: 'prefix',
      how: (sourceArg) => sourceArg.toLowerCase(),
    },
  },
  noSummary: {
    name: 'noSummary',
    describe: 'Skip the summary prompt',
    type: 'boolean',
    skipPrompt: true,
  },
  noBlocks: {
    name: 'noBlocks',
    describe: 'Pass this argument to prevent block installation',
    type: 'boolean',
    skipPrompt: true,
  },
  eightshiftLibsBranch: {
    name: 'eightshiftLibsBranch',
    describe: 'Use this to override which infinum/eightshift-libs version is loaded (mainly used for testing).',
    type: 'text',
    skipPrompt: true,
  },
  eightshiftFrontendLibsBranch: {
    name: 'eightshiftFrontendLibsBranch',
    describe: 'Use this to override which @eightshift/frontend-libs version is loaded (mainly used for testing).',
    type: 'text',
    skipPrompt: true,
  },
};

module.exports = {
  scriptArguments,
};
