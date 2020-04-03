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

        // Alias this package for use when we're working on Storybook
        // With this you can always import things from index.js using:
        // import { something } from '@eightshift/frontend-libs';
        '@eightshift/frontend-libs': path.resolve(packagesPath.libsPath),

        // Node Modules.
        EightshiftBlocksWhatwgFetch: path.resolve(packagesPath.nodeModulesPath, 'whatwg-fetch'),
        EightshiftBlocksSwiper: path.resolve(packagesPath.nodeModulesPath, 'swiper'),
        EightshiftBlocksSwiperIE: path.resolve(packagesPath.nodeModulesPath, 'swiper/js/swiper.min'),
        EightshiftBlocksBabelPolyfill: path.resolve(packagesPath.nodeModulesPath, '@babel/polyfill'),
        EightshiftBlocksAutoprefixer: path.resolve(packagesPath.nodeModulesPath, 'autoprefixer'),
        EightshiftBlocksNormalize: path.resolve(packagesPath.nodeModulesPath, 'normalize-scss'),
        EightshiftBlocksMediaBlender: path.resolve(packagesPath.nodeModulesPath, 'media-blender'),
        EightshiftBlocksSwiperStyle: path.resolve(packagesPath.nodeModulesPath, 'swiper', 'swiper.scss'),

        // Scss.
        EightshiftFrontendLibs: path.resolve(packagesPath.libsPath, 'styles', 'scss', 'eightshift-frontend-libs.scss'),
        EightshiftEditorStyleOverride: path.resolve(packagesPath.libsPath, 'styles', 'blocks', 'override-editor.scss'),

        /**
         * !!! DEPRECATED
         *
         * Please don't use the aliases below as they're only here for backwards-compatibility.
         * Instead you can import them like this:
         *
         * Old: import { EightshiftBlocksDynamicImport } from 'EightshiftBlocksDynamicImport';
         * New: import { EightshiftBlocksDynamicImport } from '@eightshift/frontend-libs';
         */

        // Libs Paths Block Helpers.
        EightshiftBlocksDynamicImport: path.resolve(packagesPath.libsPath, 'scripts', 'dynamic-import'),
        EightshiftBlocksRegisterBlocks: path.resolve(packagesPath.libsPath, 'scripts', 'register-blocks'),
        EightshiftBlocksUcfirst: path.resolve(packagesPath.libsPath, 'scripts', 'ucfirst'),
        EightshiftBlocksGetActions: path.resolve(packagesPath.libsPath, 'scripts', 'get-actions'),
        EightshiftBlocksUtilityHelpersPath: path.resolve(packagesPath.libsPath, 'scripts', 'helpers'),
        
        // Components.
        EightshiftComponentColorPalette: path.resolve(packagesPath.libsPath, 'components', 'color-palette-custom', 'color-palette-custom.js'),
        EightshiftComponentHeadingLevel: path.resolve(packagesPath.libsPath, 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
