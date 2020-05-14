import { createElement } from '@wordpress/element';

/**
 * Wrap edit component with wrapper component.
 *
 * @param {function} Component Children callback function.
 * @param {function} Wrapper Wrapper callback function.
 *
 */
export const withWrapper = (Component, Wrapper) => (props) => {
  return createElement(
    Wrapper, {
      props,
    },
    createElement(Component, props)
  );
};
