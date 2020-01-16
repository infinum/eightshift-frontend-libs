
# Change Log for the Eightshift Frontend Libs
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [Unreleased]

## [3.0.3] - 2020-01-16

## Added
- New divider block
- Added blocksAssetsPathConfig also as a default value in Webpack helper.
- Adding assetsPath and outputPath to default values in Webpack helper.

## Changed
- Complete rewrite of setup script for boilerplate.
- Updating CleanWebpackPlugin option to fix removing items in watch mode.
- Updating readme and docs.
- Moved all src/blocks/layout/... to src/blocks/components.
- Moved inital blocks setup to a separate folder.
- Decoupled normal assets from blocks for extra flexibility.
- Updating documentation.
- Changed Webpack overrides key from object to array.
- Added option to not load webpack entrypoint file if it doesn't exist.
- Updating setup script new structure.

## [3.0.2] - 2019-12-19

## Changed
- Fixing Scss build process
- Updating webpack config
- Updating readme and docs

## [3.0.1] - 2019-12-19

## Changed
- Added option to override any Webpack build options
- Removed postcss
- Changed readme docs for Webpack
- Updating alliases
- Removing unnecesery packages
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

- Complete refactor on project organisation.
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
