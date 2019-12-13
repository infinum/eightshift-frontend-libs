import React from 'react'; // eslint-disable-line no-unused-vars
import { LinkEditor as LinkEditorComponent } from '../../../components/link/components/link-editor';

export const LinkEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      styleColor,
      isAnchor,
    },
    actions: {
      onChangeTitle,
    },
  } = props;

  return (
    <LinkEditorComponent
      blockClass={blockClass}
      title={title}
      onChangeTitle={onChangeTitle}
      styleColor={styleColor}
      isAnchor={isAnchor}
    />
  );
};
