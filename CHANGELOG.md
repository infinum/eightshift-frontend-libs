
# Change Log for the Eightshift Frontend Libs
All notable changes to this project will be documented in this file.

This projects adheres to [Semantic Versioning](https://semver.org/) and [Keep a CHANGELOG](https://keepachangelog.com/).

## [12.0.0] - TBA

Dependant to [Eightshift-libs@8.0.0](https://github.com/infinum/eightshift-libs/releases/tag/8.0.0)

### Added

### Changed
- All `Components::getManifest` to `Components::getManifestByDir` method.
- All `Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest)` to `Components::outputCssVariables($attributes, $manifest, $unique)`.
- All `renderPartial` to `render` method.
- Wrapper changes `$this->renderWrapperView` to `echo $renderContent;`.

## [11.0.1] - 2024-04-23

### Updated
- Fixed block editor sidebar block display with long labels

## [11.0.0] - 2024-04-23

### Updated
- Support for WordPress 6.5
- Fixed rounding errors with `NumberPicker`
- Updated dependencies
- Fixed missing props for custom Wrapper
- Tweaked `Repeater` style a bit
- Reworked `AnimatedContentVisibility` to use Framer Motion instead of Gutenberg `Animation` component for better performance
- Fixed extra line break in Responsive label

### Removed
- WP style overrides for WordPress < 6.3

### Important
**Minimum required Node version is now 20!**

## [10.0.0] - 2024-03-18

### Removed
- Storybook is no longer part of Frontend Libs (Potentially breaking!)

### Added
- 1 new utility class: `focus-slight-button-border-wp` (as WP really likes using the `:focus` state, instead of `:focus-visible`)
- `additionalPopoverProps` prop in `PopoverWithTrigger` for passing custom props
- `data-es-popover-close` can now also close `PopoverWithTrigger` externally

### Updated
- Updated dependencies
- Replaced `import-glob-loader` with `import-glob`, as the previous package was abandoned
- Fixed `NumberPicker` spinners in Firefox
- Fixed wrong types in doc blocks (`ColorPicker`)
- Fixed `LinkInput` `fetchSuggestion` not working properly
- Tweaked `Menu` submenu style
- Fixed `PopoverWithTrigger` external closing prop passthrough

## [9.7.0] - 2024-03-08

### Added
- 1 UI icon, 9 block icons.

### Updated
- Fixed default `NumberPicker` sizing
- Tweaked some of the default `Menu` trigger button classes.
- Reworked the look of `Repeater`.
- Moved the delete button of a repeater item into an inline menu, with a slot for more options.
- Tweaked `ReOrderable` so the drag handle is the only place the item can be moved. This alleviates issues with interactive controls within the item.
- Updated dependencies.

## [9.6.0] - 2024-02-29

### Added
- New `es-size`, `es-min-size`, and `es-max-size` (+ `-nested` variants) utility classes for setting height and width at once
- New `prefix`, `suffix`, `extraButton`, and `noExtraButtonSeparator` props in `NumberPicker`
- `Collapsable` now has a `disabled` prop to disable the expand/collapse button
- 1 new UI icon

### Updated
- `NumberPicker` has been completely updated visually
- `ResponsiveNumberPicker` now better visually integrates the reset button
- Tweaked Gutenberg override classes for `NumberControl` so they don't override FE libs `NumberPicker`
- Utility classes now use logical properties for paddings, margins, borders, widths, and heights
- `IconToggle` is now `Toggle`, but the previous name will also work (for now)
- Refreshed 3 UI icons
- Updated dependencies
- `ColorPicker` now has a slot for additional controls

## [9.5.0] - 2024-02-21

### Updated
- Fixed block renaming (due to recent Gutenberg changes)
- `LinkInput` should now pop the suggestion panel only when focused into the input field
- Fixed typo in `MultiSelect` story

## [9.4.2] - 2024-02-21

### Updated
- `LinkInput` should handle input debouncing better, and the delay is now configurable via the `inputDebounceDelay` prop

## [9.4.1] - 2024-02-19

### Updated
- Dependency updates

## [9.4.2] - 2024-02-21

### Updated
- `LinkInput` should handle input debouncing better, and the delay is now configurable via the `inputDebounceDelay` prop

## [9.4.1] - 2024-02-19

### Updated
- Dependency updates

## [9.4.0] - 2024-02-14

### Added
- `truncate` text helper to make strings of limited width easier

### Updated
- `ColumnConfigSlider` has a bit cleaner and more compact styling
- Updated 1 UI icon
- Added 21 new UI icons
- Updated default Gutenberg tooltip style
- `LinkEditComponent` is now `LinkInput`, but the previous name will also work (for now).
- `LinkInput` has been reworked from the ground up, with better layout and nicer UX.
- Updated dependencies
- Tweaked component names in `Select` controls readmes

## [9.3.1] - 2024-02-06

### Updated
- Move `@babel/preset-react` to dependencies (from devDependencies)

## [9.3.0] - 2024-02-06

### Added
- 59 new UI icons
- New `GutenbergBlock` helper component, to streamline `-block.js` files
- New `bem` helper to enable less code for selectors that don't need the more advanced conditions

### Updated
- Updated 18 UI icons
- Fixed JSDoc `inlineLabel` prop types within `OptionSelector` and `ColorPallete`
- Fixed `disabled` prop not working within certain variants of `IconToggle`
- Fixed WP 6.4 block names in certain places (e.g. breadcrumbs in Editor)
- Fixed readme for `ResponsiveSlider`
- `WidthOffsetRangeSlider` now has a `colAutoStartOverride` prop
- `WidthOffsetRangeSlider` will behave better when using AUTO offset

### Storybook
- Cleaned up Storybook majorly and migrated it to 7.x

### Important
**Minimum required Node version is now 18!**

## [9.2.1] - 2024-01-25

### Added
- 17 new UI icons

### Updated
- Tweaked some of the default Gutenberg style overrides
- Fixed default block names in WP 6.4

## [9.2.0] - 2024-01-15

### Added
- 12 new UI icons
- 1 new block icon
- new `lodash` function replacements
- `ColorPicker` has new configuration options available: `expanded`, `border`, `inlineLabel`
- `OptionSelector` has a new `labelOnlyOnActive` configuration option
- `PopoverWithTrigger` got a new prop injection functionality to simplify external popover closing (via `allowCloseFromChildren` on the Popover, and `esClosesModalOnClick` on any element child)
- `.es-tabular-nums`, `.es-hidden` (`visibility: hidden`) and `es-dots-background` (dotted background) utility classes have been added

### Updated
- Project will now only lint staged files
- All of the dependencies have been updated to the latest versions
- Stylelint rules have been cleaned up, and previous rules have been reintroduced from a different package, due to changes in Stylelint
- Updated some of the current helpers to use new, lightweight implementations
- Fixed some linter errors
- Fixed a bug within Quote block where an attribute was missing
- `AdvancedColorPicker` has a new design
- Fixed a bug with gradient picker inside `AdvancedColorPicker`
- `ColorPalette` has a new design
- `ColorPicker` has a refreshed design
- `ColorSwatch` has a new design and its performance was optimized a bit
- `ColorSwatch` has a new swatch for "undefined" colors, so the empty state looks nicer (if `es-undefined` is passed as a color value)
- Heading, Paragraph, Video, and Button blocks/components have had their options tweaked
- Fixed wrong gap in `UseToggle` with the only toggle and label visible
- `getPaletteColors()` helper now returns from the built-in FE libs stores, instead of WP colors
- Fixed tests

### Removed
- `lodash` is no longer used in the project

## [9.1.0] - 2023-11-16

### Added
- New block icon (*Search field*)
- Support for Gutenberg block renaming (requires WordPress 6.4.x or newer)

### Updated
- Improved support for WordPress 6.4.x
- Map block now works with the latest version of OpenLayers (8.1.0 at the time of publishing)
- Map block has a better layer adder
- Improved default GeoJSON styles in Map block
- Carousel now works with the latest version of Swiper (11.0.4 at the time of publishing)

## [9.0.0] - 2023-11-06

This is a major release that includes PHP8+ support. We tested it on the PHP 8.2.12 version.

### Added
- Better copy for checkAttr helper if key is missing.

### Updated
- Composer packages.
- Composer command names.
- Npx command readme.

### Removed
- Unnecessary standards and ignoring lines.
- Storybook support for local project.

## [8.6.2] - 2023-10-24

### Added
- `wrapper` corrections to be used using the `render` method as a standalone component.

### Changed
- cleaned up the `Load more` JS logic

## [8.6.1] - 2023-10-23

### Fixed
- Wrong release number.

## [8.6.0] - 2023-10-23

### Fixed
- Block registration issue with WooCommerce combination.

## [8.5.0] - 2023-10-17

### Added
- a couple of new icons
- a couple of new utility classes (z-index, isolation, border: none)
- new `Menu` component (together with `MenuItem` and `MenuSeparator`)

### Changed
- SASSDoc and Storybook sidebars are now blue
- fixed RC Slider ColumnConfigSlider background
- tweaked Gutenberg UI enhancements control roundness
- `PopoverWithTrigger` can now have classes passed to the outer/main popover as well

## [8.4.7] - 2023-09-28

### Added
- a couple of new icons
- a custom `label` option for the `BlockInserter`

### Changed
- incorrect rounded corners in `NumberPicker` spinner buttons

## [8.4.6] - 2023-09-25

### Added
- a couple of new icons

### Changed
- fixed duplicate label on `LinkEditComponent`
- tweaked some Gutenberg components to have (more) rounded corners, so it matches better with everything else
- updated RC slider and fixed issue with `ColumnConfigSlider` being offset
- tweaked the ESLint config

## [8.4.5] - 2023-09-13

### Added
- a couple of new icons.
- a couple of new text casing utility classes.

### Changed
- **Storybook was re-styled** a bit to make it fit bitter into eightshift.com (had to use overrides, as there's no official way, should be relatively stable with updates).
- **SASS docs were restyled** to make them fit better into eightshift.com.
- `AdvancedColorPicker` now uses 3rd party components for solid color and gradient pickers, removing the Gutenberg dependency and breaking changes they often make (fixes #746).

## [8.4.4] - 2023-08-28

### Changed
- Es-lint rule to ignore max length.

### Added
- WebPack loaded will not parse webP images also.

## [8.4.3] - 2023-08-25

### Added
- added missing import for WP6.3 styles
- Repeater now supports disabling the "Add" button via `disableItemAdd` and providing a custom one via `customAddButton`

## [8.4.2] - 2023-08-11

### Added
- support for WP 6.3.
- added 11 new UI icons and 1 new block icon.

### Changed
- `fetchWpApi` now has a `searchColumns` param to enable further filtering.
- `Site footer` and `Site navbar` now use a simpler mechanism for ID generation, removing the dependency for `window.crypto` (which doesn't work in non-HTTPS environemnts).
- `Repeater` and `ReOrderable` will now auto-regenerate all item IDs if a conflict is found.
- `PopoverWithTrigger` now supports external closing from within the popover content.

## [8.4.1] - 2023-06-20

### Changed
- updating random Id generator to output 8 rather than 32 characters.

## [8.4.0] - 2023-06-13

### Removed
- removed `menu` component, as it's not needed anymore.
- removed `layout-three-columns` as it's not used anywhere anymore.

### Added
- added `admin-header-footer-picker` component (renders the settings page).
- totally revamped theme and plugin setups visually.
- theme setup is now fully hands-off and automatic (including `init theme`, `npm install`, `theme activate` and setting up reusable header/footer).
- "Site navigation" and "Site footer" block, to enable making use of WP menus a history.

### Changed
- updated the default theme logo to the new ES DevKit one.
- drawer component, so it better integrates with the new blocks, and also uses way less JS (especially if the browser supports the `:has()` selector).

### Fixed
- fixed #726 (bug with Repeater).
- fixed `LinkEditComponent` not clearing properly when there's no text inside in some cases.

## [8.3.0] - 2023-05-15

### Bugfixes
- fixed Advanced color picker crashing when selecting gradient
- fixed Paragraph block splitting issues and improved merge logic
- fixed Image block previews for weird aspect ratios
- fixed various icon sizes throughout the UI, caused by Gutenberg

### New UI components
- added a highly configurable PresetPicker component
- ReOrderable component - similar to Repeater, but without the expanding part

### UI component updates
- new UI and block icons
- Notification component now supports additionalClasses prop
- fixed Repeater doc block and cleaned up the code a bit
- Repeater now has a preIcon slot - for items to the left of the label
- Slider, RangeSlider and ColumnConfigSlider can now have onBeforeChange and onAfterChange callbacks
- OptionSelector now supports adding subtitle to its items
- `Control` now allows wrapping components in a div with a class, if needed
- fixed `LinkEditComponent` padding being weird in some cases (e.g. in a flyout)
- `FancyDivider` border has higher contrast now

### New blocks
- added Map block
- added Table of contents block
- removed existing share and social-links components, replaced them with social-networks component and block
- added Site navigation block
- added Site footer block

### Block updates
- added presets to Columns
- wrapper has a new preview when configuring width and offset

### Experiments
- added experimental Graphical editing mode to wrapper - enable it through the global manifest

### Misc
- replaced the deprecated registerStore method for ES stores

## [8.2.1] - 2023-04-26

### Fixed
- Spinners in NumberPicker will now set the min value if no value is currently present (undefined or empty value).
- Columns will now hide the full wrapper option.

## [8.2.0] - 2023-04-25

### Added
- added extra tweaks for some built in components (like the snackbar).
- added some new UI icons, **529** total now!

### Fixed
- fixed an age-old issue with block registration, where the React HTML parser was screwing up some block icons in the inserter, causing malformed attributes (e.g. `viewbox` instead of `viewBox`).
- fixed editor CSS variable output (#701).

### Changed
- fully ready for WordPress 6.2! (including fixes for #712 and #708).
- `NumberPicker` now has a `placeholder` option.
- Wrapper fixes for the project colors in the color picker.
- Wrapper full-width for mobile is now default as `false` (instead of nothing before).
- expanded utility classes.
- fixed media placeholder missing in Image (#710).
- Icon picker shouldn't overflow anymore with some very long labels (#707).
- Variable for "list type options" and "lists type" have the same name causing premature return.
- Updated the variable name for viable lists options to differentiate from the list type variable name.
- **fully updated all Block icons and Forms block icons** (most of icons redrawn from scratch); **183** total (40 of those are Forms block icons)

### Removed
- removed some unused attributes from Button component (#706).

## [8.1.0] - 2023-03-01

## Fixed
- UseToggle missing expanded outline when only label and expand button are visible.
- default WP appender not allowing clicks around it.

## Added
- 2 new icons.

## Changes
- IconToggle with tileIcon style can now have its additionalClasses passed through.

## [8.0.0] - 2023-02-21

- This is major release with most of the changes on the components and UX/UI

## [7.3.0] - 2022-11-09

### Changed
- reverted WP 6.1 `BaseControl label` casing.
- fixed `IconToggle` and `ToggleControl` changes due to the new internal structure.
- slightly tweaked `SimpleHorizontalSingleSelect` styling.
- restyled `SimpleVerticalSingleSelect` to match `SimpleHorizontalSingleSelect`.
- tweaked Gutenberg toggle controls to better fit into our libs.
- added new icons.
- fixed weird icon alignments in pickers and inserter.

## [7.2.0] - 2022-10-04

### Added
- new flag in the manifest for `innerBlocksDependency` that will tell the WP-CLI about items dependency.

### Fixed
- tweaked Gutenberg's` NumberControl` style to better match our components.
- added new icons.
- `CustomSelect` can now have custom props passed (e.g., if you need to selectively disable some options or need any feature from React Select that we didn't have an abstraction for).
- `CustomRangeSlider` had broken custom tooltip formatter, it works fine now!
- `WidthOffsetRangeSlider` now has new, more logical tooltips on width and offset handles.
- `ColorPickerComponent` can have the pop-up color list style changed.
- rename the paragraph components inside the quote component to `quote` and `attribution` for better distinction.

### Removed
- duplicated normalize imports on block assets.
- double import of `@wordpress/components` statement in the advanced color picker component.

## [7.1.0] - 2022-09-06

### Changed
- facelift for all components and a bunch of new components. All details can be seen [here](https://github.com/infinum/eightshift-frontend-libs/pull/661)

### Fixed
- advanced-color-picker component double import.

## [7.0.1] - 2022-08-01

### Changed
- Fixing tests.
- Updating create setup process to show requirements and forbidden words.
- Updated Github actions.
- Override editor to fix broken inserter position.

### Added
- Tag in readme for codecov.
- Added tests coverage.

## [7.0.0] - 2022-07-11

### Changed
- Updated Webpack to v5 and all packages.
- Updated block featured-content to use load-more.
- Stylelint config.
- Babel config.
- Eslint config.

### Added
- New component layout.
- New component load-more.
- Corrections for the new create-project setup.
- Rem transform helper for postcss.
- Variations to store.
- Readme description about every package used.
- New frontend entrypoint file for blocks/components.

### Fixed
- Issues regarding dart-sass.

### Removed
- normalize.scss package and replaced it with our version.

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

[12.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/11.0.1...12.0.0
[11.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/11.0.0...11.0.1
[11.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/10.0.0...11.0.0
[10.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.7.0...10.0.0
[9.7.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.6.0...9.7.0
[9.6.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.5.0...9.6.0
[9.5.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.4.2...9.5.0
[9.4.2]: https://github.com/infinum/eightshift-frontend-libs/compare/9.4.1...9.4.2
[9.4.1]: https://github.com/infinum/eightshift-frontend-libs/compare/9.4.0...9.4.1
[9.4.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.3.1...9.4.0
[9.3.1]: https://github.com/infinum/eightshift-frontend-libs/compare/9.3.0...9.3.1
[9.3.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.2.1...9.3.0
[9.2.1]: https://github.com/infinum/eightshift-frontend-libs/compare/9.2.0...9.2.1
[9.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.1.0...9.2.0
[9.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/9.0.0...9.1.0
[9.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.6.2...9.0.0
[8.6.2]: https://github.com/infinum/eightshift-frontend-libs/compare/8.6.1...8.6.2
[8.6.1]: https://github.com/infinum/eightshift-frontend-libs/compare/8.6.0...8.6.1
[8.6.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.5.0...8.6.0
[8.5.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.7...8.5.0
[8.4.7]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.6...8.4.7
[8.4.6]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.5...8.4.6
[8.4.5]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.4...8.4.5
[8.4.4]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.3...8.4.4
[8.4.3]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.2...8.4.3
[8.4.2]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.1...8.4.2
[8.4.1]: https://github.com/infinum/eightshift-frontend-libs/compare/8.4.0...8.4.1
[8.4.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.3.0...8.4.0
[8.3.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.2.1...8.3.0
[8.2.1]: https://github.com/infinum/eightshift-frontend-libs/compare/8.2.0...8.2.1
[8.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.1.0...8.2.0
[8.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/8.0.0...8.1.0
[8.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/7.3.0...8.0.0
[7.3.0]: https://github.com/infinum/eightshift-frontend-libs/compare/7.2.0...7.3.0
[7.2.0]: https://github.com/infinum/eightshift-frontend-libs/compare/7.1.0...7.2.0
[7.1.0]: https://github.com/infinum/eightshift-frontend-libs/compare/7.0.1...7.1.0
[7.0.1]: https://github.com/infinum/eightshift-frontend-libs/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/infinum/eightshift-frontend-libs/compare/6.2.0...7.0.0
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
