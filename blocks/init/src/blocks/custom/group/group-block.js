import React from 'react'; // eslint-disable-line no-unused-vars
import { GroupEditor } from './components/group-editor';
import './hooks';

export const Group = (props) => {

  const {
    attributes,
  } = props;

  return (
    <GroupEditor
      attributes={attributes}
    />
  );
};


