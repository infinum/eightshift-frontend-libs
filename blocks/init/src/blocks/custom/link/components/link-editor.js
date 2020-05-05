import React from 'react'; // eslint-disable-line no-unused-vars
import { LinkEditor as LinkEditorComponent } from '../../../components/link/components/link-editor';

export const LinkEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    link,
  } = attributes;

  const {
    onChangeLinkTitle,
  } = actions;

  return (
    <LinkEditorComponent
      blockClass={blockClass}
      link={(typeof link === 'undefined') || link}
      onChangeTitle={onChangeLinkTitle}
    />
  );
};
