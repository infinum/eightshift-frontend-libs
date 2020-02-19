import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';

export const HeadingToolbar = (props) => {
  const {
    attributes: {
      heading,
    },
    actions: {
      onChangeHeadingLevel,
      onChangeHeadingStyleAlign,
    },
  } = props;

  return (
    <HeadingToolbarComponent
      heading={(typeof heading === 'undefined') || heading}
      onChangeLevel={onChangeHeadingLevel}
      onChangeStyleAlign={onChangeHeadingStyleAlign}
    />
  );
};
