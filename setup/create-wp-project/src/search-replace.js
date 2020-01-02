
const replace = require('replace-in-file');
const path = require('path');

const {
  files: {
    findReplace,
  },
} = require('eightshift-scripts');

const defaultValues = {
  package: 'eightshift-boilerplate',
  namespace: 'Eightshift_Boilerplate',
  env: 'ES_ENV',
  projectPrefix: 'eb8',
  url: 'dev.boilerplate.com',
};

const searchReplace = async(data, projectPath) => {

  // Name.
  if (data.projectName) {
    await replace({
      files: path.join(projectPath, 'functions.php'),
      from: /^ \* Theme Name:.*$/m,
      to: ` * Theme Name: ${data.projectName}`,
    });
    await replace({
      files: path.join(projectPath, 'style.css'),
      from: /^Theme Name: .*$/m,
      to: `Theme Name: ${data.projectName}`,
    });
  }

  // Description
  if (data.description) {
    await replace({
      files: path.join(projectPath, 'functions.php'),
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
    });
    await replace({
      files: path.join(projectPath, 'style.css'),
      from: /^Description: .*$/m,
      to: `Description: ${data.description}`,
    });
  }

  // Package
  if (data.package) {
    await findReplace(projectPath, defaultValues.package, data.package);
  }

  // Namespace
  if (data.namespace) {
    await findReplace(projectPath, defaultValues.namespace, data.namespace);
  }

  // ENV
  if (data.env) {
    await findReplace(projectPath, defaultValues.env, data.env);
  }

  // src/class-config.php - project-prefix
  if (data.projectPrefix) {
    await replace({
      files: path.join(projectPath, 'src', 'class-config.php'),
      from: new RegExp(defaultValues.projectPrefix, 'g'),
      to: data.projectPrefix,
    });
  }

  // webpack.config.js - BrowserSync proxy url.
  if (data.url) {
    await replace({
      files: path.join(projectPath, 'webpack.config.js'),
      from: new RegExp(defaultValues.url, 'g'),
      to: data.url,
    });
  }
};

module.exports = {
  searchReplace,
};
