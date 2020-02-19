
const replace = require('replace-in-file');
const path = require('path');
const fs = require('fs-extra');

const {
  files: {
    findReplace,
  },
} = require('eightshift-scripts');

const defaultValues = {
  package: 'eightshift-boilerplate',
  namespace: 'Eightshift_Boilerplate',
  env: 'EB_ENV',
  projectPrefix: 'eb',
  url: 'dev.boilerplate.com',
};

const searchReplace = async(data, projectPath) => {
  const pathFunctionsPhp = path.join(projectPath, 'functions.php');
  const pathStyleCss = path.join(projectPath, 'style.css');
  const pathClassConfigPhp = path.join(projectPath, 'src', 'class-config.php');
  const pathWebpackConfigJs = path.join(projectPath, 'webpack.config.js');

  // Name.
  if (
    data.projectName &&
    await fs.pathExists(pathFunctionsPhp) &&
    await fs.pathExists(pathStyleCss)
  ) {
    await replace({
      files: pathFunctionsPhp,
      from: /^ \* Theme Name:.*$/m,
      to: ` * Theme Name: ${data.projectName}`,
    });
    await replace({
      files: pathStyleCss,
      from: /^Theme Name: .*$/m,
      to: `Theme Name: ${data.projectName}`,
    });
  }

  // Description
  if (
    data.description &&
    await fs.pathExists(pathFunctionsPhp) &&
    await fs.pathExists(pathStyleCss)
  ) {
    await replace({
      files: pathFunctionsPhp,
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
    });
    await replace({
      files: pathStyleCss,
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
  if (data.projectPrefix && await fs.pathExists(pathClassConfigPhp)) {
    await replace({
      files: pathClassConfigPhp,
      from: new RegExp(defaultValues.projectPrefix, 'g'),
      to: data.projectPrefix,
    });
  }

  // webpack.config.js - BrowserSync proxy url.
  if (data.url && await fs.pathExists(pathWebpackConfigJs)) {
    await replace({
      files: pathWebpackConfigJs,
      from: new RegExp(defaultValues.url, 'g'),
      to: data.url,
    });
  }
};

module.exports = {
  searchReplace,
  defaultValues,
};
