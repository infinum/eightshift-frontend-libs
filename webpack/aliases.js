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

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs/styles/index.scss'. It will be removed in the next version.
         */
        EightshiftFrontendLibs: path.resolve(packagesPath.libsPath, 'styles', 'index.scss'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs/styles/override-editor.scss'. It will be removed in the next version.
         */
        EightshiftEditorStyleOverride: path.resolve(packagesPath.libsPath, 'styles', 'override-editor.scss'),

        /**
         * @deprecated Since version 3.2. Replace it with '~swiper/swiper.scss'. It will be removed in the next version.
         */
        EightshiftBlocksSwiperStyle: path.resolve(packagesPath.nodeModulesPath, 'swiper', 'swiper.scss'),

        /**
         * @deprecated Since version 3.2. Replace it with 'swiper/js/swiper.min'. It will be removed in the next version.
         */
        EightshiftBlocksSwiperIE: path.resolve(packagesPath.nodeModulesPath, 'swiper/js/swiper.min'),

        /**
         * @deprecated Since version 3.2. Replace it with 'normalize-scss'. It will be removed in the next version.
         */
        EightshiftBlocksNormalize: path.resolve(packagesPath.nodeModulesPath, 'normalize-scss'),

        /**
         * @deprecated Since version 3.2. Replace it with 'autoprefixer'. It will be removed in the next version.
         */
        EightshiftBlocksAutoprefixer: path.resolve(packagesPath.nodeModulesPath, 'autoprefixer'),

        /**
         * @deprecated Since version 3.2. Replace it with '@babel/polyfill'. It will be removed in the next version.
         */
        EightshiftBlocksBabelPolyfill: path.resolve(packagesPath.nodeModulesPath, '@babel/polyfill'),

        /**
         * @deprecated Since version 3.2. Replace it with 'swiper'. It will be removed in the next version.
         */
        EightshiftBlocksSwiper: path.resolve(packagesPath.nodeModulesPath, 'swiper'),

        /**
         * @deprecated Since version 3.2. Replace it with 'whatwg-fetch'. It will be removed in the next version.
         */
        EightshiftBlocksWhatwgFetch: path.resolve(packagesPath.nodeModulesPath, 'whatwg-fetch'),

        /**
         * @deprecated Since version 3.2. Replace it with 'media-blender'. It will be removed in the next version.
         */
        EightshiftBlocksMediaBlender: path.resolve(packagesPath.nodeModulesPath, 'media-blender'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftBlocksDynamicImport: path.resolve(packagesPath.libsPath, 'scripts', 'dynamic-import'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftBlocksRegisterBlocks: path.resolve(packagesPath.libsPath, 'scripts', 'register-blocks'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftBlocksUcfirst: path.resolve(packagesPath.libsPath, 'scripts', 'ucfirst'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftBlocksGetActions: path.resolve(packagesPath.libsPath, 'scripts', 'get-actions'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftBlocksUtilityHelpersPath: path.resolve(packagesPath.libsPath, 'scripts', 'helpers'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftComponentColorPalette: path.resolve(packagesPath.libsPath, 'components', 'color-palette-custom', 'color-palette-custom.js'),

        /**
         * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
         */
        EightshiftComponentHeadingLevel: path.resolve(packagesPath.libsPath, 'components', 'heading-level', 'heading-level.js'),
      },
    },
  };
};
