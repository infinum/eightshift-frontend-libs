import React from 'react'; // eslint-disable-line no-unused-vars
import { ListsEditor as ListsEditorComponent } from '../../../Components/lists/components/lists-editor';

export const ListsEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    lists,
  } = attributes;

  const {
    onChangeListsContent,
    onChangeListsOrdered,
  } = actions;

  const listsObject = (typeof lists === 'undefined') || lists;

  return (
    <ListsEditorComponent
      blockClass={blockClass}
      lists={listsObject}
      onChangeContent={onChangeListsContent}
      onChangeOrdered={onChangeListsOrdered}
    />
  );
};
