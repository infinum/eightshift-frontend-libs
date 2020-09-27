import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

import { TextControl } from '@wordpress/components';

export const ScrollToTargetOptions = (props) => {
    const {
        scrollText,
        scrollTarget,
        onChangeScrollText,
        onChangeScrollTarget,
    } = props;

    return (
    <Fragment>

      {onChangeScrollText &&
            <TextControl
            label={__('Scroll to text', 'eightshift-boilerplate')}
            help={__('Text of the scroll to button', 'eightshift-boilerplate')}
            value={scrollText}
            onChange={onChangeScrollText}
            />
      }

      {onChangeScrollTarget &&
            <TextControl
            label={__('Scroll to target', 'eightshift-boilerplate')}
            help={__('Scroll target. Usually, this is an ID of the element that will be scrolled to', 'eightshift-boilerplate')}
            value={scrollTarget}
            onChange={onChangeScrollTarget}
            />
      }

    </Fragment>
  );
};
