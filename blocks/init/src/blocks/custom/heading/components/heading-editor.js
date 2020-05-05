import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';

export const HeadingEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    heading,
  } = attributes;

  const {
    onChangeHeadingContent,
  } = actions;

  return (
    <HeadingEditorComponent
      blockClass={blockClass}
      heading={(typeof heading === 'undefined') || heading}
      onChangeContent={onChangeHeadingContent}
    />
  );
};
