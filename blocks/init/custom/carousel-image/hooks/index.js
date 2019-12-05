import { assign } from 'lodash';
import classnames from 'classnames';

// Add options to the Gutenberg markup.
const parentComponentBlock = wp.compose.createHigherOrderComponent((BlockListBlock) => {
  console.log('UŠOOOO JEEE!!');
  
  return (innerProps) => {
    const {
      name,
      attributes: {
        blockClass,

        // Large.
        width,
        offset,
        styleVerticalAlign,

        // Desktop.
        widthDesktop,
        offsetDesktop,
        styleVerticalAlignDesktop,

        // Tablet.
        widthTablet,
        offsetTablet,
        styleVerticalAlignTablet,

        // Mobile.
        widthMobile,
        offsetMobile,
        styleVerticalAlignMobile,
      },
    } = innerProps;

    let updatedProps = innerProps;

    if (name === 'eightshift-boilerplate/carousel-image') {
      const componentClass = classnames([
        'AAAAAA',
        blockClass,

        // Large.
        width && `${blockClass}__width--${width}`,
        offset && `${blockClass}__offset--${offset}`,
        styleVerticalAlign && `${blockClass}__vertical-align--${styleVerticalAlign}`,

        // Desktop.
        widthDesktop && `${blockClass}__width-desktop--${widthDesktop}`,
        offsetDesktop && `${blockClass}__offset-desktop--${offsetDesktop}`,
        styleVerticalAlignDesktop && `${blockClass}__vertical-align-desktop--${styleVerticalAlignDesktop}`,

        // Tablet.
        widthTablet && `${blockClass}__width-tablet--${widthTablet}`,
        offsetTablet && `${blockClass}__offset-tablet--${offsetTablet}`,
        styleVerticalAlignTablet && `${blockClass}__vertical-align-tablet--${styleVerticalAlignTablet}`,

        // Mobile.
        widthMobile && `${blockClass}__width-mobile--${widthMobile}`,
        offsetMobile && `${blockClass}__offset-mobile--${offsetMobile}`,
        styleVerticalAlignMobile && `${blockClass}__vertical-align-mobile--${styleVerticalAlignMobile}`,
      ]);

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

wp.hooks.addFilter('editor.BlockListBlock', 'eightshift-boilerplate/carousel-image', parentComponentBlock);
