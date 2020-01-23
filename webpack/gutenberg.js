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
        EightshiftBlocksDynamicImport: path.resolve(__dirname, '..', 'scripts', 'dynamic-import'),
        EightshiftBlocksRegisterBlocks: path.resolve(__dirname, '..', 'scripts', 'register-blocks'),
        EightshiftBlocksUcfirst: path.resolve(__dirname, '..', 'scripts', 'ucfirst'),
        EightshiftBlocksGetActions: path.resolve(__dirname, '..', 'scripts', 'get-actions'),
        EightshiftBlocksStorybookHelpers: path.resolve(__dirname, '..', '.storybook', 'helpers'),
        EightshiftBlocksUtilityHelpersPath: path.resolve(__dirname, '..', 'scripts', 'helpers'),

        // JavaScript
        EightshiftBlocksWhatwgFetch: path.resolve(options.config.libNodeModules, 'whatwg-fetch'),
        EightshiftBlocksSwiper: path.resolve(options.config.libNodeModules, 'swiper'),
        EightshiftBlocksBabelPolyfill: path.resolve(options.config.libNodeModules, '@babel/polyfill'),
        EightshiftBlocksAutoprefixer: path.resolve(options.config.libNodeModules, 'autoprefixer'),

        // Scss.
        EightshiftFrontendLibs: path.resolve(__dirname, '..', 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EightshiftBlocksNormalize: path.resolve(options.config.libNodeModules, 'normalize-scss'),
        EightshiftBlocksMediaBlender: path.resolve(options.config.libNodeModules, 'media-blender'),
        EightshiftBlocksSwiperStyle: path.resolve(options.config.libNodeModules, 'swiper', 'swiper.scss'),
        EightshiftEditorStyleOverride: path.resolve(__dirname, '..', 'styles', 'blocks', 'override-editor.scss'),

        // Components.
        EightshiftComponentColorPalette: path.resolve(__dirname, '..', 'components', 'color-palette-custom', 'color-palette-custom.js'),
        EightshiftComponentHeadingLevel: path.resolve(__dirname, '..', 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
