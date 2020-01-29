import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export const ExampleEditor = (props) => {
  const {
    attributes: {
      blockClass,
      content,
    },
    actions: {
      onChangeContent,
    },
  } = props;

  return (
    <RichText
      placeholder={__('Add Content', 'eightshift-blocks')}
      className={blockClass}
      onChange={onChangeContent}
      value={content}
    />
  );
};
