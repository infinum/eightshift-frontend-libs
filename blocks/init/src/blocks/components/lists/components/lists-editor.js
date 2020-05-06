import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ListsEditor = (props) => {
  const {
    lists: {
      content,
      ordered,
    },
    blockClass,
    onChangeContent,
    onChangeOrdered,
  } = props;

  const componentClass = 'lists';

  const listsClass = classnames(
    componentClass,
    `${blockClass}__lists`,
  );

  return (
    <RichText
      tagName={ordered}
      multiline="li"
      className={listsClass}
      placeholder={__('Add your list item', 'eightshift-boilerplate')}
      onChange={onChangeContent}
      value={content}
      onTagNameChange={onChangeOrdered}
    />
  );
};
