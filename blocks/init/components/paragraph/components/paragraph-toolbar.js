import React from 'react';
import { AlignmentToolbar } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
  const {
    styleAlign,
    onChangeStyleAlign,
    removeStyle,
  } = props;

  return (
    <Fragment>
      {removeStyle !== true &&
        <Fragment>
          {styleAlign &&
            <AlignmentToolbar
              value={styleAlign}
              onChange={onChangeStyleAlign}
            />
          }
        </Fragment>
      }
    </Fragment>
  );
};
