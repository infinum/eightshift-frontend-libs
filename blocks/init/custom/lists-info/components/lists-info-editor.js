import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';
import { ListsEditor } from './../../../components/lists/components/lists-editor';

export const ListsInfoEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      content,
      ordered,
    },
    actions: {
      onChangeTitle,
      onChangeContent,
      onChangeOrdered,
    },
  } = props;

  const introClass = `${blockClass}__intro`;
  const titleClass = `${blockClass}__title`;
  const contentClass = `${blockClass}__content`;

  return (
    <div className={blockClass}>
      <div className={introClass}>
        <div className={titleClass}>
          <RichText
            placeholder={__('Add title', 'eightshift-boilerplate')}
            onChange={onChangeTitle}
            value={title}
          />
        </div>
      </div>
      <div className={contentClass}>
        <ListsEditor
          blockClass={blockClass}
          content={content}
          onChangeContent={onChangeContent}
          ordered={ordered}
          onChangeOrdered={onChangeOrdered}
        />
      </div>
    </div>
  );
};
