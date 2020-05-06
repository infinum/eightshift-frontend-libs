import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { HeadingLevel } from '@eightshift/frontend-libs/scripts/components';

export const HeadingToolbar = (props) => {
  const {
    heading: {
      level,
      styleAlign,
    },
    onChangeLevel,
    onChangeStyleAlign,
  } = props;

  return (
    <Fragment>
      {onChangeLevel &&
        <HeadingLevel
          selectedLevel={level}
          onChange={onChangeLevel}
        />
      }

      {onChangeStyleAlign &&
        <AlignmentToolbar
          value={styleAlign}
          onChange={onChangeStyleAlign}
        />
      }

    </Fragment>
  );
};
