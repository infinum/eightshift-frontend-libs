import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';

export const ParagraphEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    paragraph,
  } = attributes;

  const {
    onChangeParagraphContent,
  } = actions;

  return (
    <ParagraphEditorComponent
      blockClass={blockClass}
      paragraph={(typeof paragraph === 'undefined') || paragraph}
      onChangeContent={onChangeParagraphContent}
    />
  );
};
