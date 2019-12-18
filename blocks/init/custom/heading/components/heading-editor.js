import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';

export const HeadingEditor = (props) => {
  const {
    attributes: {
      blockClass,
      heading,
    },
    actions: {
      onChangeHeadingContent,
    },
  } = props;

  return (
    <HeadingEditorComponent
      blockClass={blockClass}
      heading={heading}
      onChangeContent={onChangeHeadingContent}
    />
  );
};
