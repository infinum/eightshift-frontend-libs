import React from 'react'; // eslint-disable-line no-unused-vars
import { LinkEditor as LinkEditorComponent } from '../../../components/link/components/link-editor';

export const LinkEditor = (props) => {
  const {
    attributes: {
      blockClass,
      link,
    },
    actions: {
      onChangeLinkTitle,
    },
  } = props;

  return (
    <LinkEditorComponent
      blockClass={blockClass}
      link={(typeof link === 'undefined') || link}
      onChangeTitle={onChangeLinkTitle}
    />
  );
};
