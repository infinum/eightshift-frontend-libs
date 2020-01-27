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
        EightshiftBlocksWhatwgFetch: path.resolve(packagesPath.nodeModulesPath, 'whatwg-fetch'),
        EightshiftBlocksSwiper: path.resolve(packagesPath.nodeModulesPath, 'swiper'),
        EightshiftBlocksBabelPolyfill: path.resolve(packagesPath.nodeModulesPath, '@babel/polyfill'),
        EightshiftBlocksAutoprefixer: path.resolve(packagesPath.nodeModulesPath, 'autoprefixer'),
        EightshiftBlocksNormalize: path.resolve(packagesPath.nodeModulesPath, 'normalize-scss'),
        EightshiftBlocksMediaBlender: path.resolve(packagesPath.nodeModulesPath, 'media-blender'),
        EightshiftBlocksSwiperStyle: path.resolve(packagesPath.nodeModulesPath, 'swiper', 'swiper.scss'),

        // Libs Paths Block Helpers.
        EightshiftBlocksDynamicImport: path.resolve(packagesPath.libsPath, 'scripts', 'dynamic-import'),
        EightshiftBlocksRegisterBlocks: path.resolve(packagesPath.libsPath, 'scripts', 'register-blocks'),
        EightshiftBlocksUcfirst: path.resolve(packagesPath.libsPath, 'scripts', 'ucfirst'),
        EightshiftBlocksGetActions: path.resolve(packagesPath.libsPath, 'scripts', 'get-actions'),
        EightshiftBlocksUtilityHelpersPath: path.resolve(packagesPath.libsPath, 'scripts', 'helpers'),

        // Scss.
        EightshiftFrontendLibs: path.resolve(packagesPath.libsPath, 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EightshiftEditorStyleOverride: path.resolve(packagesPath.libsPath, 'styles', 'blocks', 'override-editor.scss'),

        // Components.
        EightshiftComponentColorPalette: path.resolve(packagesPath.libsPath, 'components', 'color-palette-custom', 'color-palette-custom.js'),
        EightshiftComponentHeadingLevel: path.resolve(packagesPath.libsPath, 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
