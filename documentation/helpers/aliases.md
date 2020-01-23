## Helpful aliases

We have created a lot of helpful aliases that you can use in your project.

## JavaScript Dynamic Import Helper

In order to get (require) all the files using `require.context`  method, we created a helper located [here](https://github.com/infinum/eightshift-frontend-libs/blob/develop/scripts/dynamic-import.js).

It finds all files recursively in the folder using regex. This example will require all `assets/index.js` files inside the `custom` folder, so there is no need to add the files to the build manually.

#### Usage
```js
import { dynamicImport } from 'EightshiftBlocksDynamicImport';

dynamicImport(require.context('./../../custom', true, /assets\/index.js$/));
```

## JavaScript Ucfirst Helper

Converts the first letter of the string to uppercase.

#### Usage
```js
import { ucfirst } from 'EightshiftBlocksUcfirst';

ucfirst('custom string');
```

## JavaScript Utilities path

We have also created a bunch of JavaScript helpers located in [helpers folder](https://github.com/infinum/eightshift-frontend-libs/tree/develop/scripts/helpers).

This alias provides only path to helpers folder.

#### Usage
```js
import { media } from 'EightshiftBlocksUtilityHelpersPath/media';
```

## JavaScript WhatwgFetch

Alias providing [Whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch). Check documentation for more details.

#### Usage
```js
import 'EightshiftBlocksWhatwgFetch';
```

## JavaScript Swiper

Alias providing [Swiper](https://www.npmjs.com/package/swiper). Check documentation for more details.

#### Usage

JavaScript
```js
import 'EightshiftBlocksSwiper';
```

Styles:
```scss
@import 'EightshiftBlocksSwiperStyle';
```

## JavaScript Babel Polyfill

Alias providing [Babel Polyfill](https://babeljs.io/docs/en/babel-polyfill). Check documentation for more details.

#### Usage

```js
import 'EightshiftBlocksBabelPolyfill';
```

## Scss EightshiftFrontendLibs

Alias providing [Eightshift Frontend Libs](https://infinum.github.io/eightshift-frontend-libs/sassdocs/).

#### Usage

Styles:
```scss
@import 'EightshiftFrontendLibs';
```

## Scss Normalize

Alias providing [Normalize](https://www.npmjs.com/package/normalize-scss). Check documentation for more details.

#### Usage

Styles:
```scss
@import 'EightshiftBlocksNormalize';
@include normalize(); // stylelint-disable-line at-rule-empty-line-before
```

## Scss Media Blender

Alias providing [Media Blender](https://github.com/infinum/media-blender). Check documentation for more details.

#### Usage

Styles:
```scss
@import 'EightshiftBlocksMediaBlender';
```

## Scss EditorStyleOverride

It provides the Block Editor overrides on some styles to give better UX for our block.

#### Usage

Styles:
```scss
@import 'EightshiftEditorStyleOverride';
```
