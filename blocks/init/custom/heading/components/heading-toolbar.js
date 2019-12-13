import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';

export const HeadingToolbar = (props) => {
  const {
    attributes: {
      level,
      styleAlign,
    },
    actions: {
      onChangeLevel,
      onChangeStyleAlign,
    },
  } = props;

  return (
    <HeadingToolbarComponent
      level={level}
      onChangeLevel={onChangeLevel}
      styleAlign={styleAlign}
      onChangeStyleAlign={onChangeStyleAlign}
    />
  );
};
