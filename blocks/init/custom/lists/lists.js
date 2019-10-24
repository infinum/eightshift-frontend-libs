import { Fragment } from '@wordpress/element';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { ListsEditor } from '../../components/lists/components/lists-editor';

export const Lists = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      ordered,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <ListsEditor
        blockClass={blockClass}
        content={content}
        onChangeContent={actions.onChangeContent}
        ordered={ordered}
        onChangeOrdered={actions.onChangeOrdered}
      />
    </Fragment>
  );
};
