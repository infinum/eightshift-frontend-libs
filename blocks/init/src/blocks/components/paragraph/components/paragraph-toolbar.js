import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
  const {
    paragraph: {
      styleAlign,
      removeStyle,
    },
    onChangeStyleAlign,
  } = props;

  return (
    <Fragment>
      {removeStyle !== true &&
        <Fragment>
          {onChangeStyleAlign &&
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
