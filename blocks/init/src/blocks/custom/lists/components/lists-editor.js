import React from 'react'; // eslint-disable-line no-unused-vars
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';

export const ListsEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    lists,
  } = attributes;

  const {
    onChangeListsContent,
    onChangeListsOrdered,
  } = actions;

  return (
    <ListsEditorComponent
      blockClass={blockClass}
      lists={(typeof lists === 'undefined') || lists}
      onChangeContent={onChangeListsContent}
      onChangeOrdered={onChangeListsOrdered}
    />
  );
};
