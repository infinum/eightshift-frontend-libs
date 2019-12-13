import React from 'react'; // eslint-disable-line no-unused-vars
import { ListsEditor as ListsEditorComponent } from '../../../components/lists/components/lists-editor';

export const ListsEditor = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      ordered,
    },
    actions: {
      onChangeContent,
      onChangeOrdered,
    },
  } = props;

  return (
    <ListsEditorComponent
      blockClass={blockClass}
      content={content}
      onChangeContent={onChangeContent}
      ordered={ordered}
      onChangeOrdered={onChangeOrdered}
    />
  );
};
