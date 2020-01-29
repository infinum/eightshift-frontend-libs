import { assign } from 'lodash';
import manifest from './../../manifest.json';

// Add options to the Gutenberg markup.
const parentComponentBlock = wp.compose.createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
    } = innerProps;

    let updatedProps = innerProps;

    if (name.split('/')[0] === manifest.namespace) {
      updatedProps = assign(
        {},
        innerProps,
        {
          className: 'eightshift-block',
        }
      );
    }

    return wp.element.createElement(
      BlockListBlock,
      updatedProps
    );
  };
}, 'parentComponentBlock');

wp.hooks.addFilter('editor.BlockListBlock', 'infinum', parentComponentBlock);
