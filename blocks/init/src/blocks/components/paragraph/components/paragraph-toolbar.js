import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export const ParagraphToolbar = (props) => {
  const {
    styleAlign,
  } = props.paragraph;

  const {
    onChangeStyleAlign,
  } = props;

  return (
    <Fragment>
      {onChangeStyleAlign &&
        <AlignmentToolbar
          value={styleAlign}
          onChange={onChangeStyleAlign}
        />
      }
    </Fragment>
  );
};
