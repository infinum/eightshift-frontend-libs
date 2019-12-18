import { assign } from 'lodash';

const usedBlock = 'eightshift-boilerplate/card-list';

const parentComponentBlock = wp.compose.createHigherOrderComponent((BlockListBlock) => {
  return (innerProps) => {
    const {
      name,
      attributes: {
        blockClass,
      },
    } = innerProps;

    let updatedProps = innerProps;

    if (name === usedBlock) {
      const componentClass = blockClass;

      updatedProps = assign(
        {},
        innerProps,
        {
          className: componentClass,
        }
      );
    }

    return wp.element.createElement(
      BlockListBlock,
      updatedProps
    );
  };
}, 'parentComponentBlock');

wp.hooks.addFilter('editor.BlockListBlock', usedBlock, parentComponentBlock);
