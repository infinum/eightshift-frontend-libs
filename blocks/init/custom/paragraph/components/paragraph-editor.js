import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphEditor as ParagraphEditorComponent } from '../../../components/paragraph/components/paragraph-editor';

export const ParagraphEditor = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      styleAlign,
      styleColor,
      styleSize,
      removeStyle,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <ParagraphEditorComponent
      blockClass={blockClass}
      content={content}
      onChangeContent={onChangeContent}
      styleAlign={styleAlign}
      styleColor={styleColor}
      styleSize={styleSize}
      removeStyle={removeStyle}
    />
  );
};
