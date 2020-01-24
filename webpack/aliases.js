/**
 * Project Aliases used for getting all the correct paths.
 *
 * @since 2.0.0
 */

const path = require('path');

module.exports = (packagesPath) => {
  return {
    resolve: {
      alias: {

        // Node Modules.
        EighshiftBlocksWhatwgFetch: path.resolve(packagesPath.nodeModulesPath, 'whatwg-fetch'),
        EighshiftBlocksSwiper: path.resolve(packagesPath.nodeModulesPath, 'swiper'),
        EighshiftBlocksBabelPolyfill: path.resolve(packagesPath.nodeModulesPath, '@babel/polyfill'),
        EighshiftBlocksAutoprefixer: path.resolve(packagesPath.nodeModulesPath, 'autoprefixer'),
        EighshiftBlocksNormalize: path.resolve(packagesPath.nodeModulesPath, 'normalize-scss'),
        EighshiftBlocksMediaBlender: path.resolve(packagesPath.nodeModulesPath, 'media-blender'),
        EighshiftBlocksSwiperStyle: path.resolve(packagesPath.nodeModulesPath, 'swiper', 'swiper.scss'),

        // Libs Paths Block Helpers.
        EighshiftBlocksDynamicImport: path.resolve(packagesPath.libsPath, 'scripts', 'dynamic-import'),
        EighshiftBlocksRegisterBlocks: path.resolve(packagesPath.libsPath, 'scripts', 'register-blocks'),
        EighshiftBlocksUcfirst: path.resolve(packagesPath.libsPath, 'scripts', 'ucfirst'),
        EighshiftBlocksGetActions: path.resolve(packagesPath.libsPath, 'scripts', 'get-actions'),
        EighshiftBlocksUtilityHelpersPath: path.resolve(packagesPath.libsPath, 'scripts', 'helpers'),

        // Scss.
        EighshiftFrontendLibs: path.resolve(packagesPath.libsPath, 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EighshiftEditorStyleOverride: path.resolve(packagesPath.libsPath, 'styles', 'blocks', 'override-editor.scss'),

        // Components.
        EighshiftComponentColorPalette: path.resolve(packagesPath.libsPath, 'components', 'color-palette-custom', 'color-palette-custom.js'),
        EighshiftComponentHeadingLevel: path.resolve(packagesPath.libsPath, 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
