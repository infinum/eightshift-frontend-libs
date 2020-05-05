import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { ListsEditor } from './../../../components/lists/components/lists-editor';

export const ListsInfoEditor = ({ attributes, actions }) => {
  const {
    blockClass,
    title,
    lists,
  } = attributes;

  const {
    onChangeTitle,
    onChangeListsContent,
    onChangeListsOrdered,
  } = actions;

  const introClass = `${blockClass}__intro`;
  const titleClass = `${blockClass}__title`;
  const contentClass = `${blockClass}__content`;

  const listsObject = (typeof lists === 'undefined') || lists;

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
          lists={listsObject}
          onChangeContent={onChangeListsContent}
          onChangeOrdered={onChangeListsOrdered}
        />
      </div>
    </div>
  );
};
