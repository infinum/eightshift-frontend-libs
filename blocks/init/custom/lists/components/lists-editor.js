import React from 'react'; // eslint-disable-line no-unused-vars
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';

export const ListsEditor = (props) => {
  const {
    attributes: {
      blockClass,
      lists,
    },
    actions: {
      onChangeListsContent,
      onChangeListsOrdered,
    },
  } = props;

  return (
    <ListsEditorComponent
      blockClass={blockClass}
      lists={lists}
      onChangeContent={onChangeListsContent}
      onChangeOrdered={onChangeListsOrdered}
    />
  );
};
