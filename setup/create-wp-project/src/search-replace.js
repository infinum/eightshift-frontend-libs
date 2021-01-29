
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
  namespace: 'EightshiftBoilerplate',
  url: 'dev.boilerplate.com',
};

const searchReplace = async(data, projectPath) => {
  const pathFunctionsPhp = path.join(projectPath, 'functions.php');
  const pathStyleCss = path.join(projectPath, 'style.css');
  const pathWebpackConfigJs = path.join(projectPath, 'webpack.config.js');
  const pathEntryFile = path.join(projectPath, `${defaultValues.package}.php`);

  // functions.php.
  if (data.projectName && data.description && await fs.pathExists(pathFunctionsPhp)) {
    await replace({
      files: pathFunctionsPhp,
      from: /^ \* Theme Name:.*$/m,
      to: ` * Theme Name: ${data.projectName}`,
    });
    await replace({
      files: pathFunctionsPhp,
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
    });
  }

  // style.css
  if (data.projectName && data.description && await fs.pathExists(pathStyleCss)) {
    await replace({
      files: pathStyleCss,
      from: /^Theme Name: .*$/m,
      to: `Theme Name: ${data.projectName}`,
    });
    await replace({
      files: pathStyleCss,
      from: /^Plugin Name: .*$/m,
      to: `Plugin Name: ${data.projectName}`,
    });
    await replace({
      files: pathStyleCss,
      from: /^Description: .*$/m,
      to: `Description: ${data.description}`,
    });
  }

  // eightshift-boilerplate.php
  if (data.projectName && data.description && await fs.pathExists(pathEntryFile)) {
    await replace({
      files: pathEntryFile,
      from: /^ \* Plugin Name:.*$/m,
      to: ` * Plugin Name: ${data.projectName}`,
    });
    await replace({
      files: pathEntryFile,
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
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

  // webpack.config.js - BrowserSync proxy url.
  if (data.url && await fs.pathExists(pathWebpackConfigJs)) {
    await replace({
      files: pathWebpackConfigJs,
      from: new RegExp(defaultValues.url, 'g'),
      to: data.url,
    });
  }

  // Rename plugin entrypoint (if setting up a plugin).
  if (await fs.pathExists(pathEntryFile)) {
    fs.rename(pathEntryFile, path.join(projectPath, `${data.package}.php`));
  }
};

module.exports = {
  searchReplace,
  defaultValues,
};
