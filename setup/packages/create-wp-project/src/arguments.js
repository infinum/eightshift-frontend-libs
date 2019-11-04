const scriptArguments = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Please enter your project name (e.g. Your Project Name):',
  },
  {
    type: 'text',
    name: 'url',
    message: 'Your dev url (e.g. dev.wordpress.com):',
  },
  {
    type: 'text',
    name: 'description',
    message: 'Your project\'s description:',
  },
  {
    type: 'text',
    name: 'package',
    message: 'Please specify the package name (e.g. package_name):',
    buildFrom: {
      name: 'projectName',
      how: sourceArg => sourceArg.toLowerCase().split(' ').join('-'),
    },
  },
  {
    type: 'text',
    name: 'namespace',
    message: 'Please specify the namespace name (e.g. Package_Name):',
    buildFrom: {
      name: 'projectName',
      how: sourceArg => sourceArg.charAt(0).toUpperCase() + sourceArg.slice(1).split(' ').join('_'),
    },
  },
  {
    type: 'text',
    name: 'prefix',
    message: 'Please specify the prefix (e.g. INF):',
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
  {
    type: 'text',
    name: 'env',
    message: 'Please specify the env variable name (e.g. INF_ENV):',
    buildFrom: {
      name: 'prefix',
      how: sourceArg => `${sourceArg}_ENV`,
    },
  },
  {
    type: 'text',
    name: 'assetManifest',
    message: 'Please specify the assetManifest name (e.g. INF_ASSETS_MANIFEST):',
    buildFrom: {
      name: 'prefix',
      how: sourceArg => `${sourceArg}_ASSETS_MANIFEST`,
    },
  },
];

module.exports = {
  scriptArguments,
};
