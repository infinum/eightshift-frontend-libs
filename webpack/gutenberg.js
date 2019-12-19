/**
 * Project Block Editor config used for Block Editor specific build.
 *
 * @since 2.0.0
 */

const path = require('path');

/**
 * Return all global objects from window object.
 * Add all Block Editor external libs so you can use it like @wordpress/lib_name.
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
        EighshiftBlocksStorybookHelpers: path.resolve(__dirname, '..', '.storybook', 'helpers'),
        EighshiftBlocksUtilityHelpersPath: path.resolve(__dirname, '..', 'scripts', 'helpers'),

        // Libs
        EighshiftBlocksNormalize: path.resolve(options.config.libNodeModules, 'normalize-scss'),
        EighshiftBlocksMediaBlender: path.resolve(options.config.libNodeModules, 'media-blender'),
        EighshiftBlocksWhatwgFetch: path.resolve(options.config.libNodeModules, 'whatwg-fetch'),
        EighshiftBlocksSwiper: path.resolve(options.config.libNodeModules, 'swiper'),
        EighshiftBlocksSwiperStyle: path.resolve(options.config.libNodeModules, 'swiper', 'swiper.scss'),
        EighshiftBlocksBabelPolyfill: path.resolve(options.config.libNodeModules, '@babel/polyfill'),
        EighshiftBlocksAutoprefixer: path.resolve(options.config.libNodeModules, 'autoprefixer'),

        // Blocks Editor Styles.
        EighshiftFrontendLibs: path.resolve(__dirname, '..', 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EighshiftEditorStyleOverride: path.resolve(__dirname, '..', 'styles', 'blocks', 'override-editor.scss'),

        // Components.
        EighshiftComponentColorPalette: path.resolve(__dirname, '..', 'components', 'color-palette-custom', 'color-palette-custom.js'),
        EighshiftComponentHeadingLevel: path.resolve(__dirname, '..', 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
