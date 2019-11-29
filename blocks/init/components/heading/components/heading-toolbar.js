import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from 'EighshiftComponentHeadingLevel';

export const HeadingToolbar = (props) => {
  const {
    level,
    onChangeLevel,
    styleAlign,
    onChangeStyleAlign,
  } = props;

  return (
    <Fragment>
      {level &&
        <HeadingLevel
          selectedLevel={level}
          onChange={onChangeLevel}
        />
      }

      {styleAlign &&
        <AlignmentToolbar
          value={styleAlign}
          onChange={onChangeStyleAlign}
        />
      }

    </Fragment>
  );
};
