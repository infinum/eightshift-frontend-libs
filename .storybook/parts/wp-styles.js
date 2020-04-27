export const storybookInternalWpStyles = () => {
  require('./../../node_modules/@wordpress/editor/build-style/style-rtl.css');
  require('./../../node_modules/@wordpress/editor/build-style/style.css');
  require('./../../node_modules/@wordpress/components/build-style/style.css');
  require('./../../node_modules/@wordpress/block-editor/build-style/style.css');
  require('./../../node_modules/@wordpress/format-library/build-style/style.css');
  require('./editor-styles.scss');
}

export const storybookWpStyles = () => {
  require('EightshiftBlocksStorybookWp/editor/build-style/style-rtl.css');
  require('EightshiftBlocksStorybookWp/editor/build-style/style.css');
  require('EightshiftBlocksStorybookWp/components/build-style/style.css');
  require('EightshiftBlocksStorybookWp/block-editor/build-style/style.css');
  require('EightshiftBlocksStorybookWp/format-library/build-style/style.css');
}
