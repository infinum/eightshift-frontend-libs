import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';

export const ParagraphEditor = (props) => {
  const {
    attributes: {
      blockClass,
      paragraph,
    },
    actions: {
      onChangeParagraphContent,
    },
  } = props;

  return (
    <ParagraphEditorComponent
      blockClass={blockClass}
      paragraph={(typeof paragraph === 'undefined') || paragraph}
      onChangeContent={onChangeParagraphContent}
    />
  );
};
