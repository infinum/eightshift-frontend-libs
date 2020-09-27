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

    const linkObject = (typeof link === 'undefined') || link;

    return (
    <LinkEditorComponent
      blockClass={blockClass}
      link={linkObject}
      onChangeTitle={onChangeLinkTitle}
    />
  );
};
