import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingToolbar as HeadingToolbarComponent } from '../../../components/heading/components/heading-toolbar';

export const HeadingToolbar = ({ attributes, actions }) => {
  const {
    heading,
  } = attributes;

  const {
    onChangeHeadingLevel,
    onChangeHeadingStyleAlign,
  } = actions;

  return (
    <HeadingToolbarComponent
      heading={(typeof heading === 'undefined') || heading}
      onChangeLevel={onChangeHeadingLevel}
      onChangeStyleAlign={onChangeHeadingStyleAlign}
    />
  );
};
