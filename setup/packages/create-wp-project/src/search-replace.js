
const replace = require('replace-in-file');
const path = require('path');

const {
  files: {
    findReplace,
    fullPath,
    rename,
  },
} = require('eightshift-scripts');

const defaultValues = {
  name: 'Eightshift Boilerplate Internal',
  package: 'eightshift-boilerplate',
  namespace: 'Eightshift_Boilerplate',
  env: 'ES_ENV',
  manifest: 'ES_ASSETS_MANIFEST',
};

const searchReplace = async (data) => {
  const oldThemePath = path.join(fullPath, 'wp-content', 'themes', defaultValues.package);
  const themePath = path.join(fullPath, 'wp-content', 'themes', data.package);

  // Replace theme name
  if (data.package) {
    await rename(oldThemePath, themePath);
  }

  // Name
  if (data.projectName) {
    await replace({
      files: path.join(themePath, 'functions.php'),
      from: /^ \* Theme Name:.*$/m,
      to: ` * Theme Name: ${data.projectName}`,
    });
    await replace({
      files: path.join(themePath, 'style.css'),
      from: /^Theme Name: .*$/m,
      to: `Theme Name: ${data.projectName}`,
    });
  }

  // Description
  if (data.description) {
    await replace({
      files: path.join(themePath, 'functions.php'),
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
    });
    await replace({
      files: path.join(themePath, 'style.css'),
      from: /^Description: .*$/m,
      to: `Description: ${data.description}`,
    });
  }

  // Package
  if (data.package) {
    await findReplace(fullPath, defaultValues.package, data.package);
  }

  // Namespace
  if (data.namespace) {
    await findReplace(fullPath, defaultValues.namespace, data.namespace);
  }

  // env
  if (data.env) {
    await findReplace(fullPath, defaultValues.env, data.env);
  }

  // assetManifest
  if (data.manifest) {
    await findReplace(fullPath, defaultValues.manifest, data.manifest);
  }

  // BrowserSync proxy url.
  if (data.url) {
    await replace({
      files: path.join(fullPath, 'webpack', 'config.js'),
      from: /proxyUrl: .*$/m,
      to: `proxyUrl: '${data.url}',`,
    });
  }

  // Theme name and theme version
  await findReplace(themePath, 'ES_THEME_NAME', `${data.prefix}_THEME_NAME`);
  await findReplace(themePath, 'ES_THEME_VERSION', `${data.prefix}_THEME_VERSION`);

  // Themen name and version constants in blocks
  await findReplace(themePath, 'return THEME_NAME;', `return ${data.prefix}_THEME_NAME;`);
  await findReplace(themePath, 'return THEME_VERSION;', `return ${data.prefix}_THEME_VERSION;`);
};

module.exports = {
  searchReplace,
};
