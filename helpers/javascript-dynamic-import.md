# JavaScript Dynamic Import Helper

In order to get (require) all the files using `require.context` method we created a helper (located [here](https://github.com/infinum/eightshift-frontend-libs/blob/develop/scripts/dynamic-import.js)).

```js
/**
 * Loop all paths required using require.context method.
 *
 * @param {object} paths All require.context patch to iterate.
 *
 * @since 1.0.0
 */
export function dynamicImport(paths) {
  paths.keys().forEach(paths);
}
```

### Usage

Find all the blocks and require assets index.js inside it.

```js
dynamicImport(require.context('./../../custom', true, /assets\/index.js$/));
```
