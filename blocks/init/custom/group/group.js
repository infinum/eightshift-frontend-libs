import { GroupEditor } from './components/group-editor';

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


