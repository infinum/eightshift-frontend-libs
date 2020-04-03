import { __ } from '@wordpress/i18n';
import React from 'react'; // eslint-disable-line no-unused-vars

export const ScrollToTargetEditor = (props) => {
  const {
    scrollText,
  } = props;

  return (
    <button className="js-scroll-to-target scroll-to-target">
      {scrollText}
    </button>
  );
};
