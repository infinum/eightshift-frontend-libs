import React from 'react'; // eslint-disable-line no-unused-vars
import { HeadingEditor as HeadingEditorComponent } from '../../../components/heading/components/heading-editor';

export const HeadingEditor = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      level,
      styleAlign,
      styleColor,
      styleSize,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <HeadingEditorComponent
      blockClass={blockClass}
      content={content}
      onChangeContent={onChangeContent}
      level={level}
      styleAlign={styleAlign}
      styleColor={styleColor}
      styleSize={styleSize}
    />
  );
};
