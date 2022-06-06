
# Change Log for the Eightshift Frontend Libs
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [6.2.0] - 2022-06-03

### Added
- New block icons.
- Breakpoints map to style to be able to use manifest breakpoints.
- Option to use rem based fonts on frontend and in editor. Used for fluid design.

### Fixed
- Safari bug on hamburger menu.

## [6.1.0] - 2022-05-19

### Fixed:
- refactored `unescapeHTML` to work way more reliably.
- readme and doc comment for `Responsive` are now correct.
- `Collapsable`, `CollapsableComponentUseToggle` and `CompactResponsive` are now smarter with outline indentation and nesting.

### Changed:
- additional/custom classes can be passed to more components now (`CollapsableComponentUseToggle`, `SimpleHorizontalSingleSelect`, `CustomSlider`, `CustomRangeSlider` ).
- added new utility classes for display, aligns, flexbox, ...
- added new sizes for utility classes.
- refactored `InlineNotification` to make it fit in better with current components.
- refactored `LinkEditComponent` to make it fit in better with current components.
- added an opt-in class to allow animating the `inherit` arrow.
- a couple of default ES admin colors were changed to have more contrast and look better.
- `CustomSlider` and `CustomRangeSlider` have better value displays now - the width is auto-calculated based on the `max` value to prevent the layout from moving when changing for example from 9 to 10.
- `IconLabel` has a subtitle gap option now.
- added new icons.

## [6.0.5] - 2022-05-11

### Fixed:
- classNames style issue fixed.

## [6.0.4] - 2022-05-11

### Fixed:
- classNames issue on fancy divider and compact responsive components.

## [6.0.3] - 2022-05-09

### Changed:
- sassdocs build style.
- all internal components now uses internal links and not alias.
- all internal components now uses css variables that can be overriden from the project.
- readded missing export for `CustomSelectStyle`.
- `IconToggle` can now have additional classes passed through.
- `FancyDivider` has a new alternate look option.
- `SimpleHorizontalSingleSelect`.
  - buttons are now square when `iconOnly` is set.
  - new option for larger icons.
  - there is a new `vertical` layout.
- `CompactResponsive`
  - custom breakpoint labels can be passed to the component now.
  - additional classes can be passed through.
- fixed z-index overlap issues in some cases with `CustomSelect`.
- `ColorPickerComponent` and `ColorPalleteCustom` now properly handle `transparent` color (checkerboard pattern is rendered).
- `IconLabel` now has a `subtitle` option (a more compact option for basic help).
- `AdvancedColorPicker` has been fully refactored to make it look nicer and more compact.

### Added:
- added new icons and update some existing ones.
- added new utility classes.

### Screenshots

- New `AdvancedColorPicker`

![image](https://user-images.githubusercontent.com/77000136/166936581-b6fac794-eacc-4809-8c2e-26478b52dc64.png)
![image](https://user-images.githubusercontent.com/77000136/166936637-0e3c3868-7a85-4a65-b51f-6b797a577962.png)

- `transparent` support in color picker components

![image](https://user-images.githubusercontent.com/77000136/166936740-bb8eb73f-25ea-4c78-80c2-18fd04f78f35.png)
![image](https://user-images.githubusercontent.com/77000136/166936793-fbaeb2d9-be8e-4787-8954-272088fd8565.png)

## [6.0.2] - 2022-05-02

### Fixed:
- internal components now use relative paths for internal imports (instead of `@eightshfit/frontend-libs/scripts`).
- `CustomSelect` and `Custom(Range)Slider` have been partly refactored and should be more performant now.
- `CompactResposnive` now has an option to hide the default breakpoint indicators; this now allows the old `Responsive` to render the new component without any breaking changes 🎉  (you should still take your time and remove the breakpoint labels and switch to `CompactResponsive`, though 😄 ).
- `CustomSelect` has an `additionalClasses` param now.
- `ColorPickerComponent`/`ColorPalleteCustom` now have an improved sorting logic - single color shades won't get their own group; also the grouping functionality is toggleable now.
- `ColorPickerComponent` has its missing `searachable` prop readded 😅 .
- `CollapsableComponentUseToggle` has a brand new look and a way nicer feel and layout.
- `Collapsable` was partly reworked to optimize its styles and better align it to the new CollapsableComponentUseToggle.
- there are a couple of new (UI) icons.
- a couple of style fixes and utility classes were added.
- add `GradientPicker` component with fallback for versions prior to 5.9

## [6.0.1] - 2022-04-21

### Fixed
- Blocks correct order of store registration.

## [6.0.0] - 2022-04-19

- Major braking changes do to updates on css variables, and helpers and updating min PHP version to 7.4.
- Full change log can be checked on Github [releases](https://github.com/infinum/eightshift-frontend-libs/releases/tag/6.0.0).

## [5.0.3] - 2022-01-26

### Added
- GH Actions optimization
  - Added concurrency that will cancel previous workflow runs for the same branch that have not yet completed.

### Updated
- Added new icons

### Fixed
- Linter fixes - missing semicolon

## [5.0.2] - 2021-09-13

### Fixed
- Hotfix for missing package and broken build.

## [5.0.1] - 2021-09-13

### Added
- New babel config to silence warnings for plugin-proposal-private-property-in-object.
- New modal component.
- New blockquote block.

### Changed
- OverrideInnerBlockAttributes helper now supports exclude prop.

### Fixed
- Phpstan issues.
- Blocks not rendering in the storybook.

## [5.0.0] - 2021-08-16
- Major braking changes do to updates on css variables, and helpers.

## [4.0.8] - 2022-01-26

### Added
- Added 11 new components and a couple of new helpers from Frontend Libs 5.x and 6.x
- Added top-level imports for components, helpers and scripts

### Changed
- Updated `ColorPalleteCustom`, `CustomSelect`, `HeadingLevel`, `LinkToolbarButton`, `OptionPicker`, `Responsive` and `ServerSideRender`
- Updated UI and block icons
- Update `override-editor` styles

## [4.0.7] - 2021-07-22

### Changed
- Fix for webpack cache issue.

## [4.0.6] - 2021-07-15

### Changed
- Minor backend changes.

## [4.0.5] - 2021-02-04

### Changed
- DependencyExtractionWebpackPlugin added config to json file as dependency tree.

### Added
- New config for webpack to use https in browserSync

## [4.0.4] - 2021-02-03

### Added
- Vertical align to column block.
- Implemented new icons set for component, blocks and helper modal.
- YoastSeo plugin helper to be able to process content for analysis.
- Image component added alt option.
### Changed
- Better documentation for helper modal.
- Cleanup for documentation.

## [4.0.3] - 2021-01-26

### Added
- Camelize helper.
- GetOptionsColor helper.

### Fixed
- Component image stretching issue with align.
- Component column offset not working.
- Component column order not working.
- Component columns option was not working in multiple nested levels.
- Component columns vertical align was not working.

### Changed
- Wrapper, Paragraph, Lists, Link, Heading, Button component to a new GetOptionsColor helper.

## [4.0.2] - 2021-01-15

### Removed
- Removed package-lock.json
- Removed composer.lock
- Removed version number from composer.json

### Added
- New Jumbotron block.
- New Jumbotron component.

### Changed
- Image component align in 9 position
- Image component wrap semantic class.
- Link component wrap semantic class.
- Heading component wrap semantic class.
- Paragraph component wrap semantic class.
- Babel config changes.
- Video Component hotfix.

## [4.0.1] - 2021-01-13

### Added
- New Inline font color mixin.
- @babel/plugin-proposal-class-properties package in Babel config.

### Changed
- Wrap selector for components: Button, Image, Link.

### Fixed
- Missing Browser sync package.
- Not working @wordpress/dom-ready package loaded from Webpack.

## [4.0.0] - 2021-01-05
MAYOR BREAKING CHANGES

- You should not try to update from version 3 to 4 because they are not compatible.
## [3.5.0] - 2020-06-03

### Added
- Option to create block variations from manifest.json.
- Removing `blockName-icons.js` file and added ability to add SVG icon from `manifest.json`.
- Changed `columns` and `column` block icon to manifest.
- New package `react-html-parser`.
- Variation example for `button` block.
- Variation example for `grid` block.

### Changed
- Fixes on columns block.
- Optimization on block and variation registration.
- Changed `application-block-editor.js` file for a new setup.
- How storybook handles variations.

### Breaking change
- Update your `application-block-editor.js` [file](https://github.com/infinum/eightshift-frontend-libs/blob/develop/blocks/init/src/blocks/assets/scripts/application-blocks-editor.js) for a new setup.

## [3.4.0] - 2020-05-28

### Changed
- Changed the file name for `transforms.js` to `blockName-transforms.js`.
- Changed the file name for `icons` to blockName-icons.js.
- Storybook is now loading example data the same as in the native/core blocks.
- All example keys to match the new setup.
- All `story.js` files to accommodate for a new example key.
- Structural changes how `registerBlocks` and `registerBlock` methods are working.
- Fixing some bugs in `registerBlock` method.
- Structural changes in all storybook helpers.
- Converted `withWrapper` method to jsx.

### Added
- Hooks specific file in blocks.
- Variation specific file in blocks.

## [3.3.0] - 2020-05-15

### Added
- Wrapped new attributes: `wrapperUse`, `wrapperUseShowControl`, `wrapperUseSimple`, `wrapperUseSimpleShowControl`, `wrapperDisable`.
- All packages from WP core for the latest build.
- Github Actions for testing.

### Changed
- Fixing storybook and example field inside manifest.
- Structural changes on all blocks.
- Converted all wrapper attributes to objects.
- Storybook correction for new example layout of attributes.
- Bug fixes on `Columns` and `Column` block.
- Bugfixes on color palette helper.
- Added options to `Group` block.
- Fixed and UX correction for `Button` block.
- Some UX and UI fixed.
- If attribute is type `object` it will now automatically build actions for each key in `manifest.json`.

### Removed
- Cards Grid block.
- Cards List block.

## [3.2.2] - 2020-05-15

### Added
* New block Columns.
* New block Column.
* New responsive-selectors helper to turndown the boilerplate code.
* Has wrapper as na option in wrapper component.
* Wrapper option to sass modifiers-deep and modifiers mixin.

### Changed
* Storybook changes for the new setup.
* Changes on wrapper component to have object attributes.

## [3.2.1] - 2020-05-13

### Added
* Option to add [transforms](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#transforms-optional) inside manifest.json file.
* Option to add custom [svg](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#icon-optional) icon inside manifest.json file.
* Featured Posts - block that enables selecting specific posts to display on page
* `font-face` - mixin for generating `@font-face` definitions

### Fixed
* Fixed issue #96 - Plugin name / description now correctly renamed during setup
* Fixed issue #116 - Copy storybook during setup
* Eightshift Boilerplate asci-art split into two lines to better break on narrow terminals

### Changed
* Adding transforms and custom svg icon is optional. To enable this options in your existing project you need change registerBlocks method inside [application-blocks-editor.js](https://github.com/infinum/eightshift-frontend-libs/blob/master/blocks/init/src/blocks/assets/scripts/application-blocks-editor.js) file.


## [3.2.0] - 2020-05-06

### Breaking change
There has been some breaking changes in this release.
Follow this migration script in order for you project to work correctly with the new changes.

* We have removed all Webpack aliases, to fix this search and replace this strings inside you project:
	* `import 'EightshiftBlocksWhatwgFetch'`                                 -----> `import 'whatwg-fetch'`
	* `import Swiper from 'EightshiftBlocksSwiper'`                          -----> `import Swiper from 'swiper'`
	* `import 'EightshiftBlocksSwiperIE'`                                    -----> `import 'swiper/js/swiper.min'`
	* `import 'EightshiftBlocksBabelPolyfill'`                               -----> `import '@babel/polyfill'`
	* `import 'EightshiftBlocksAutoprefixer'`                                -----> `import 'autoprefixer'`
	* `@import 'EightshiftBlocksNormalize'`                                  -----> `@import 'normalize-scss'`
	* `@import 'EightshiftBlocksMediaBlender'`                               -----> `@import 'media-blender'`
	* `@import 'EightshiftBlocksSwiperStyle'`                                -----> `@import '~swiper/swiper.scss'`
	* `import { dynamicImport } from 'EightshiftBlocksDynamicImport'`        -----> `import { dynamicImport } from '@eightshift/frontend-libs/scripts/helpers'`
	* `import { registerBlocks } from 'EightshiftBlocksRegisterBlocks'`      -----> `import { registerBlocks } from '@eightshift/frontend-libs/scripts/editor'`
	* `import { ucfirst } from 'EightshiftBlocksUcfirst'`                    -----> `import { ucfirst } from '@eightshift/frontend-libs/scripts/editor'`
	* `import { getActions } from 'EightshiftBlocksGetActions'`              -----> `import { getActions } from '@eightshift/frontend-libs/scripts/editor'`
	* `import { getActions } from 'EightshiftBlocksGetActions'`              -----> `import { getActions } from '@eightshift/frontend-libs/scripts/editor'`
	* `import { ... } from 'EightshiftBlocksUtilityHelpersPath/...'`         -----> `import { ... } from '@eightshift/frontend-libs/scripts/helpers'`
	* `@import 'EightshiftFrontendLibs'`                                     -----> `@import '@eightshift/frontend-libs/styles/index.scss'`
	* `@import 'EightshiftEditorStyleOverride'`                              -----> `@import '@eightshift/frontend-libs/styles/override-editor.scss'`
	* `import { ColorPaletteCustom } from 'EightshiftComponentColorPalette'` -----> `import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components'`
	* `import { HeadingLevel } from 'EightshiftComponentHeadingLevel'`       -----> `import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components'`
* Storybook scripts and helpers have been moved and restructured. To fix this just recopy all Storybook config files in your project. Files can be found [here](https://github.com/infinum/eightshift-frontend-libs/tree/master/blocks/init/storybook).

### Added
* Missing registerBlocks import.
* Scroll-to-target component that has two options: target element to scroll to and text of the scroll-to link.
* Fixed a bug with centering where logo wouldn't be quite centered on mobile - seemingly due to having `flex-basis` set to auto. Setting it to any other value (such as `1px`) fixed the issue.
* Fixed a bug where `drawer` wouldn't work if `page-overlay` did not exist.
* Added support for `behind` and `top` drawers / mobile menus (slide from top or fade in).
* Better vertical / horizontal centering (more `flex`, less `height`, proper justifying).
* Removed some `height: 100%` which made styling links difficult and coupled to header / footer height.
* `page-overlay` added to script init project.
* `editor-color-palette` - Modified the `ColorPaletteCustom` component to get colors by default from WordPress's global store.
* `editor-color-palette` - Modified all uses of `ColorPaletteCustom` component to not override default colors (except for wrapper).
* `editor-color-palette` - Added a helper (using React hooks) for reading colors from WordPress's global store.
* Added docs for `editor-color-palette`.

### Changed
- js loader to be able to handle components from the lib

## [3.1.1] - 2020-03-05

### Fixed
* Wrong namespace in components helpers.
* Removing unnecessary map keys for components style.
* Fixing drawer styles.
* Fixing menu styles.
* Loading z-index from external map.
* Fixing typo translate3D to translate3d.
* Removing display: inline-block;
* Fixing logo styles.
* Fixing broken scroll to top method.

## [3.1.0] - 2020-03-04

### Added
- Added copying of components used by header & footer
- Added `.travis.yml`.
- Added integration test for setting up a plugin using `npx create-wp-project plugin`.
- Added `create-wp-project` tests run in travis.
- Added auto detection of React version to eslint config..
- Added footer & header to copy blocks script.
- Added foreground color for icons.
- Added underline-text mixin.
- Added underline mixin.
- Added for-each-attribute mixin.
- Added block manifest registration ability to register blocks in different manifest than global settings.
- Added new alias `EightshiftBlocksSwiperIE` for Swiper slider with IE 11 support.
- Added component - `header`.
- Added component - `menu`.
- Added component - `menu-drawer`.
- Added component - `hamburger`.
- Added component - `footer`.
- Added component - `copyright`.
- Added 2 possible modifiers to menu for media-specific display property.

### Changed
- Moved all tests from `create-wp-project` to `eightshift-frontend-libs`.
- Refactoring stories to simpler setup.
- Linting fixes.
- Removed jQuery from scroll-to-top component and carousel.

### Removed
- Removed hardcoded media-specific display properties

## [3.0.11] - 2020-01-29

### Changed
- Reverting override styles.

## [3.0.10] - 2020-01-29

### Changed
- Fixed externals import.

## [3.0.9] - 2020-01-29

### Changed
- Fixed lodash import.

## [3.0.8] - 2020-01-29

### Changed
- Added align support full to block registration
- Added align full as default align for wrapper
- Removed some of editor style overrides.
- Adding wrapper default align style.

## [3.0.7] - 2020-01-27

### Changed
- Searched and replaced all instances of Eightshift with Eightshift.

## [3.0.6] - 2020-01-27

### Removed
- Removing docs to new repository

### Changed
- Fixing options to include storybook inside a project.

## [3.0.4] - 2020-01-23

### Added

- Fixed theme setup script
- Added setup script for plugin
- Added absolute-position scss placeholder
- Updating documentation
- updating packages and fixing vulnerabilities

## [3.0.3] - 2020-01-16

### Added
- Added new divider block.
- Added blocksAssetsPathConfig also as a default value in Webpack helper.
- Added assetsPath and outputPath to default values in Webpack helper.
- Added option to not load webpack entrypoint file if it doesn't exist.

### Changed
- Changed setup script for boilerplate.
- Changed Webpack overrides key from object to array.
- Changed CleanWebpackPlugin option to fix removing items in watch mode.
- Changed readme and docs.
- Changed documentation.
- Changed setup script new structure.

### Moved
- Decoupled normal assets from blocks for extra flexibility.
- Moved all src/blocks/layout/... to src/blocks/components.
- Moved initial blocks setup to a separate folder.

## [3.0.2] - 2019-12-19

### Changed
- Fixing Scss build process
- Updating webpack config
- Updating readme and docs

## [3.0.1] - 2019-12-19

### Changed
- Added option to override any Webpack build options
- Removed postcss
- Changed readme docs for Webpack
- Updating aliases
- Removing unnecessary packages
- Optimizations for storybook

## [3.0.0] - 2019-12-18

### Added
- Installed `sassdoc`
- Added `npm run build-sassdoc` script which builds `sassdoc` (generated file: `sassdoc/index.html`)
- Added `.gitattributes`
- Storybook
- Merged sassdocs from @IvanGrginovInf
- Merged docpress from @dingo-d
- Added readme for every block
- Added multiple block/components
- Added Gutenberg playground
- Added multiple new helpers
- Merged multipleProps and media props from @tihomirselak
- Blocks refactor

## [2.0.7] - 2019-11-28

### Added
- Changelog for `2.0.6`

## [2.0.6] - 2019-11-28

### Added
- `%visually-hidden` placeholder - hide an element visually without preventing element rendering (like `display: none;` does) and without hiding from accessibility tools - [reference](https://www.w3.org/WAI/tutorials/forms/labels/#hiding-the-label-element)

## [2.0.5] - 2019-11-13

### Changed
- Changing block get actions method to fix a bug.

## [2.0.4] - 2019-11-12

### Changed
- Changing block get actions method to incorporate objects and media.

### Added
- Blocks Storybook preparations

## [2.0.3] - 2019-11-12

### Changed
- Changing postcss setup.

### Removed
- Classnames package from package.json.

## [2.0.2] - 2019-11-06

### Added
- Fixing readme logo image.
- Fixing Wrapper block spacing.

## [2.0.1] - 2019-11-06

### Added
- Rename script for [Eightshift Boilerplate](https://github.com/infinum/eightshift-boilerplate).
- Logo and Gif animation.

## [2.0.0] - 2019-11-04

- Complete refactor on project organization.
- Moving, Babel, Webpack, linters config from boilerplate to eightshift-frontend-libs.
- Adding blocks init and blocks example.
- Creating components to reuse on blocks project.

## [1.0.19] - 2019-09-18

- Adding new column-offset-modifiers mixin

## [1.0.18] - 2019-08-01

- Apply suggestions from code review

## [1.0.17] - 2019-07-19

- Initial tagged release.

[Unreleased]: https://github.com/infinum/eightshift-frontend-libs/compare/master...HEAD

[6.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/6.1.0...6.2.0
[6.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.5...6.1.0
[6.0.5]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.4...6.0.5
[6.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.3...6.0.4
[6.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.2...6.0.3
[6.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.1...6.0.2
[6.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/6.0.0...6.0.1
[6.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/5.0.2...6.0.0
[5.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.7...5.0.0
[4.0.7]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.6...4.0.7
[4.0.6]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.5...4.0.6
[4.0.5]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.4...4.0.5
[4.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.3...4.0.4
[4.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.2...4.0.3
[4.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.1...4.0.2
[4.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/4.0.0...4.0.1
[4.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.5.0...4.0.0
[3.5.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.4.0...v3.5.0
[3.4.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.3.0...v3.4.0
[3.3.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.2.2...v3.3.0
[3.2.2]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.2.1...v3.2.2
[3.2.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.1.1...v3.2.0
[3.1.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.11...v3.1.0
[3.0.11]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.10...v3.0.11
[3.0.10]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.9...v3.0.10
[3.0.9]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.8...v3.0.9
[3.0.8]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.7...v3.0.8
[3.0.7]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.6...v3.0.7
[3.0.6]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.4...v3.0.6
[3.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.3...v3.0.4
[3.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.7...v3.0.0
[2.0.7]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.6...v2.0.7
[2.0.6]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.19...v2.0.0
[1.0.19]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.18...1.0.19
[1.0.18]: https://github.com/infinum/eightshift-frontend-libs/compare/1.0.17...1.0.18
[1.0.17]: https://github.com/infinum/eightshift-frontend-libs/compare/6d7b3d4fe8f8f2d183d6b54a39e6ce7f0250ed5b...1.0.17
