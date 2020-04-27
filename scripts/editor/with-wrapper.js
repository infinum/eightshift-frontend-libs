import { createElement } from '@wordpress/element';

/**
 * Wrap edit component with wrapper component.
 *
 * @param {function} Component Children callback function.
 * @param {function} Wrapper Wrapper callback function.
 *
 * @since 1.0.4 Moving to scripts folder.
 * @since 1.0.0
 */
export const withWrapper = (Component, Wrapper) => (props) => {
  return createElement(
    Wrapper, {
      props,
    },
    createElement(Component, props)
  );
};
