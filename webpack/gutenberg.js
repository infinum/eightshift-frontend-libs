/**
 * Project Gutenberg config used for Gutenberg specific build.
 *
 * @since 2.0.0
 */

const path = require('path');

/**
 * Return all global objects from window object.
 * Add all Gutenberg external libs so you can use it like @wordpress/lib_name.
 *
 * @since 2.0.0
 */
function getExternals() {
  const ext = {};
  const wplib = [
    'components',
    'compose',
    'dispatch',
    'blocks',
    'element',
    'editor',
    'block-editor',
    'date',
    'data',
    'i18n',
    'keycodes',
    'viewport',
    'blob',
    'url',
    'apiFetch',
  ];
  wplib.forEach((name) => {
    ext[`@wp/${name}`] = `wp.${name}`;
    ext[`@wordpress/${name}`] = `wp.${name}`;
  });
  ext.ga = 'ga';
  ext.gtag = 'gtag';
  ext.jquery = 'jQuery';
  ext.react = 'React';
  ext['react-dom'] = 'ReactDOM';
  ext.backbone = 'Backbone';
  ext.lodash = 'lodash';
  ext.moment = 'moment';
  ext.tinyMCE = 'tinyMCE';
  ext.tinymce = 'tinymce';

  return ext;
}

module.exports = (options) => {

  return {
    externals: getExternals(),
    resolve: {
      alias: {

        // Block Helpers.
        EighshiftBlocksDynamicImport: path.resolve(__dirname, '..', 'scripts', 'dynamic-import'),
        EighshiftBlocksRegisterBlocks: path.resolve(__dirname, '..', 'scripts', 'register-blocks'),
        EighshiftBlocksUcfirst: path.resolve(__dirname, '..', 'scripts', 'ucfirst'),
        EighshiftBlocksGetActions: path.resolve(__dirname, '..', 'scripts', 'get-actions'),

        // Blocks Editor Styles.
        EighshiftFrontendLibs: path.resolve(__dirname, '..', 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EighshiftEditorStyleOverride: path.resolve(__dirname, '..', 'styles', 'blocks', 'override-editor.scss'),

        // Components.
        EighshiftComponentColorPalette: path.resolve(__dirname, '..', 'components', 'color-palette-custom.js'),
        EighshiftComponentHeadingLevel: path.resolve(__dirname, '..', 'components', 'heading-level.js'),
      },
    },
  };
};
