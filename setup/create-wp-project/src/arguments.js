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
  noSummary: {
    name: 'noSummary',
    describe: 'Skip the summary prompt',
    type: 'boolean',
    skipPrompt: true,
  },
  eightshiftBoilerplateBranch: {
    name: 'eightshiftBoilerplateBranch',
    describe: 'Use this to override which infinum/eightshift-boilerplate version is loaded (mainly used for testing).',
    type: 'text',
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
